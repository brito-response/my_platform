export class EfiWebhookDto {
  evento: string;
  data: {
    id?: number;
    txid?: string;
    status?: string;
    valor?: string;
    charge_id?: string;
    payment?: any;
  };
}
