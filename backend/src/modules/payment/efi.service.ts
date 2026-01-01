import { Injectable } from '@nestjs/common';
import axios from "axios";
import qs from "qs";
import https from "https";
import fs from "fs";
import crypto from "crypto";
import { Customer } from './utils/efi.interfaces';
import { ConfigService } from '@nestjs/config';
import { PixChargeDto, PixChargeRequest, PixChargeResponse, PixItem, PixPaymentResponse, PixQrCodeResponse } from './utils/pix.interface';
import { CreditCardChangePaymentResponse, CreditCardCreateChargeRequest, ItemCreditCard } from './utils/cardcredit.interface.onesteps';
import { ChargeCreationResponse, CreditCardPaymentPayload, ItemPayload, ItemsPayload } from './utils/cardcredit.interface.twostep';
import { BankingBilletPaymentPayload, BankingBilletResponse, BoletoChargePayload } from './utils/boleto.interface';
import { ApiError } from 'src/common/errors/api.error';

@Injectable()
export class EfiService {

    private baseUrl: string;
    private clientId: string;
    private clientSecret: string;
    private certificate: Buffer;

    constructor(private readonly configService: ConfigService) {
        this.baseUrl = this.configService.get<string>('EFIPAY_BASE_URL') ?? 'https://api.efipay.com.br';
        this.clientId = this.configService.get<string>('EFIPAY_CLIENT_ID') ?? "";
        this.clientSecret = this.configService.get<string>('EFIPAY_CLIENT_SECRET') ?? "";
        const certPath = this.configService.get<string>('EFIPAY_CERTIFICATE_PATH') ?? "";

        if (!certPath) throw new ApiError("Certificado da Efi não configurado.", 400);
        this.certificate = fs.readFileSync(certPath);
    }

    private getHttpsAgent(): https.Agent {
        return new https.Agent({ cert: this.certificate, key: this.certificate });
    }

    private async getAccessToken(): Promise<string> {
        const data = qs.stringify({ grant_type: "client_credentials" });

        const response = await axios.post(`${this.baseUrl}/oauth/token`, data, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            auth: {
                username: this.clientId,
                password: this.clientSecret,
            },
            httpsAgent: this.getHttpsAgent(),
        });

        return response.data.access_token;
    }

    async createRandomPixKey(): Promise<string> {
        const existingKeys = await this.getPixKeys();

        if (existingKeys.length >= 5) {
            // Se já tiver 5, retorna uma aleatória existente
            const randomIndex = Math.floor(Math.random() * existingKeys.length);
            return existingKeys[randomIndex];
        }

        const accessToken = await this.getAccessToken();

        const response = await axios.post(
            `${this.baseUrl}/v2/gn/pix/keys`,
            { tipoChave: "random" },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                httpsAgent: this.getHttpsAgent(),
            }
        );

        return response.data.chave;
    }

    /** 
     * @description Retorna as chaves Pix cadastradas na conta Efi. 
     * @returns {Promise<string[]>} Lista de chaves Pix.
    */
    async getPixKeys(): Promise<string[]> {
        const accessToken = await this.getAccessToken();

        const response = await axios.get(`${this.baseUrl}/v2/gn/pix/keys`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            httpsAgent: this.getHttpsAgent(),
        });

        return response.data.chaves.filter((chave: { tipo: string }) => chave.tipo === "random").map((chave: { chave: string }) => chave.chave);
    }

    async createImmediateChargePix({ chave, valor, nome, cpf, description }: PixChargeDto): Promise<PixChargeResponse> {
        const accessToken = await this.getAccessToken();
        const txid = crypto.randomBytes(10).toString("hex");

        const body: PixChargeRequest = {
            calendario: { expiracao: 3600 },
            devedor: { cpf, nome },
            valor: { original: valor.toFixed(2).toString() },
            chave: chave,
            solicitacaoPagador: description,
        };

        const response = await axios.put(`${this.baseUrl}/v2/cob/${txid}`,
            body,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                httpsAgent: this.getHttpsAgent(),
            }
        );
        if (response.status != 201) throw new ApiError("error in creerror in creating the charge", 400);
        // return { txid, ...response.data };

        return response.data;
    }

    async generatePixQrCode(locId: number): Promise<PixQrCodeResponse> {
        const accessToken = await this.getAccessToken();

        const response = await axios.get(`${this.baseUrl}/v2/loc/${locId}/qrcode`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            httpsAgent: this.getHttpsAgent(),
        });
        if (response.status != 200) throw new ApiError("erro to generate qrCode", 400);

        return response.data;
    }

    async createCreditCardChargeOneStep(items: ItemCreditCard[], customer: Customer, payment_token: string): Promise<CreditCardChangePaymentResponse> {
        const accessToken = await this.getAccessToken();

        const body: CreditCardCreateChargeRequest = {
            items,
            payment: {
                credit_card: { customer, installments: 1, payment_token }
            },
        };

        const response = await axios.post(`${this.baseUrl}/v1/charge/one-step`, body, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            httpsAgent: this.getHttpsAgent(),
        });
        const responseData: CreditCardChangePaymentResponse = response.data;
        if (response.status != 200 || responseData.code != 200 || responseData.data.status != "approved")
            throw new ApiError("bad request in create charge of card credit", 400);

        return response.data;
    }

    async createCreditCardCharge(items: ItemPayload[]): Promise<ChargeCreationResponse> {
        const accessToken = await this.getAccessToken();

        const body: ItemsPayload = { items };

        const response = await axios.post(`${this.baseUrl}/v1/charge`, body, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            httpsAgent: this.getHttpsAgent(),
        });
        const responseData: ChargeCreationResponse = response.data;
        if (response.status != 200 || responseData.code != 200 || responseData.data.status != "new")
            throw new ApiError("bad request in create charge of card credit", 400);

        return response.data;
    }

    async payWithCreditCard(chargeId: string, creditCardToken: string, customer: Customer, installments: number = 1): Promise<CreditCardChangePaymentResponse> {
        const accessToken = await this.getAccessToken();

        const paymentData: CreditCardPaymentPayload = {
            payment: {
                credit_card: { customer, installments, payment_token: creditCardToken },
            },
        };

        const response = await axios.post(`${this.baseUrl}/v1/charge/${chargeId}/pay`,
            paymentData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                httpsAgent: this.getHttpsAgent(),
            }
        );

        const responseData: CreditCardChangePaymentResponse = response.data;
        if (response.status != 200 || responseData.code != 200 || responseData.data.status != "waiting") throw new ApiError("bad request in create pyment of card credit", 400);

        return response.data;
    }

    // lembrar de criar cobrança depois chamar isso
    async createBoletoPaymentLink(chargeId: string, payload: BoletoChargePayload): Promise<BankingBilletResponse> {
        const accessToken = await this.getAccessToken();

        const requestBody: BankingBilletPaymentPayload = {
            payment: {
                banking_billet: {
                    customer: payload.customer,
                    address: payload.address,
                    expire_at: "2023-12-30",
                    configurations: {
                        days_to_write_off: 40,
                        fine: 105,
                        interest: {
                            value: 330, type: "monthly"
                        }
                    },
                    message: "Pague pelo código de barras ou pelo QR Code"
                },

            }
        };

        const response = await axios.post(`${this.baseUrl}/v1/charge/${chargeId}/pay`,
            requestBody,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                httpsAgent: this.getHttpsAgent(),
            }
        );

        const responseData: CreditCardChangePaymentResponse = response.data;
        if (response.status != 200 || responseData.code != 200 || responseData.data.status != "waiting") throw new ApiError("bad request in create pyment of card credit", 400);

        return response.data; // aqui virá o link, barcode, pdf, etc
    }

    /** #01 Consulta uma cobrança PIX específica via TXID */
    async getPixCharge(txid: string): Promise<PixChargeResponse> {
        const accessToken = await this.getAccessToken();

        const response = await axios.get(`${this.baseUrl}/v2/cob/${txid}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                httpsAgent: this.getHttpsAgent(),
            }
        );

        return response.data;
    }

    /** #02 Lista os PIX recebidos dentro de um intervalo de datas /v2/pix ou webhook confirmam pagamento PIX */
    async listPixPayments(inicio: string, fim: string): Promise<PixItem[]> {
        const accessToken = await this.getAccessToken();

        const response = await axios.get(`${this.baseUrl}/v2/pix?inicio=${inicio}&fim=${fim}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                httpsAgent: this.getHttpsAgent(),
            }
        );
        const responseData: PixPaymentResponse = response.data;

        return responseData.pix || [];
    }

}

