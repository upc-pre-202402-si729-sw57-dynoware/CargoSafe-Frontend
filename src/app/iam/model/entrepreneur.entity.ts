export class EntrepreneurEntity {
  id: number;
  user_id: number;

  constructor(entrepreneur: { id?: number; user_id?: number }) {
    this.id = entrepreneur.id || 0;
    this.user_id = entrepreneur.user_id || 0;
  }
}
