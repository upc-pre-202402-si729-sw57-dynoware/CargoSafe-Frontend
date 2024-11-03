export class PaymentEntity {
  id: number;
  card_number: string;
  expiry_Date: string;
  security_code: string;
  entrepreneur_id: number;
  userid: number;
   tripId: number;
  constructor(payment: {
    id?: number,
    card_number?: string,
    expiry_Date?: string,
    security_code?: string,
    entrepreneur_id?: number,
    userid?: number,
    tripId?: number;
  } = {}) {
    this.id = payment.id || 0;
    this.card_number = payment.card_number || '';
    this.expiry_Date = payment.expiry_Date || '';
    this.security_code = payment.security_code || '';
    this.entrepreneur_id = payment.entrepreneur_id || 0;
    this.userid = payment.userid || 0;
    this.tripId = payment.tripId || 0;
  }
}
