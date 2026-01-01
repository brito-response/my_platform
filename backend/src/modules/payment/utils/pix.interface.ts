interface CalendarioPix {
    expiracao: number;
}

interface DevedorPix {
    cpf: string;
    nome: string;
}

interface ValorPix {
    original: string;
}

interface PixChargeDto {
    chave: string;
    valor: number;
    nome: string;
    cpf: string;
    description: string;
}

interface PixChargeRequest {
    calendario: CalendarioPix;
    devedor: DevedorPix;
    valor: ValorPix;
    chave: string;
    solicitacaoPagador: string;
}


// RESPONSES
interface CalendarioPixResponse {
    criacao: string; // ISO Date
    expiracao: number;
}

interface PixLocation {
    id: number;
    location: string;
    tipoCob: 'cob' | 'cobv';
}

interface DevedorPix {
    cpf: string;
    nome: string;
}

interface ValorPix {
    original: string;
}

enum PixChargeStatus {
    ATIVA = 'ATIVA',
    CONCLUIDA = 'CONCLUIDA',
    REMOVIDA_PELO_USUARIO_RECEBEDOR = 'REMOVIDA_PELO_USUARIO_RECEBEDOR',
    REMOVIDA_PELO_PSP = 'REMOVIDA_PELO_PSP',
}


interface PixChargeResponse {
    calendario: CalendarioPixResponse;
    txid: string;
    revisao: number;
    loc: PixLocation;
    location: string;
    status: PixChargeStatus;
    devedor: DevedorPix;
    valor: ValorPix;
    chave: string;
    solicitacaoPagador: string;
    pixCopiaECola: string;
}

interface PixQrCodeResponse {
    qrcode: string;
    imagemQrcode: string;
    linkVisualizacao: string;
}


// pix list payment 

interface PixPaymentResponse {
    parametros: PixParametros;
    pix: PixItem[];

}

interface PixParametros {
    inicio: string; // ISO date
    fim: string;    // ISO date
    paginacao: PixPaginacao;
}

interface PixPaginacao {
    paginaAtual: number;
    itensPorPagina: number;
    quantidadeDePaginas: number;
    quantidadeTotalDeItens: number;
}
interface PixItem {
    endToEndId: string;
    txid: string;
    valor: string; // Efí sempre retorna como string
    chave: string;
    horario: string; // ISO date
    infoPagador?: string;
    pagador?: PixPagador;
    devolucoes?: PixDevolucao[];
}

interface PixPagador {
    contaBanco?: PixContaBanco;
}

export interface PixContaBanco {
    codigoBanco: string;
}
export interface PixDevolucao {
    id: string;
    rtrId: string;
    valor: string;
    horario: PixHorarioDevolucao;
    status: 'EM_PROCESSAMENTO' | 'DEVOLVIDO' | 'NAO_REALIZADO';
}

export interface PixHorarioDevolucao {
    solicitacao: string; // ISO date
    liquidacao?: string; // pode não existir dependendo do status
}

export type { PixChargeDto, PixChargeRequest, PixChargeStatus, PixChargeResponse, PixQrCodeResponse, PixPaymentResponse, PixItem };