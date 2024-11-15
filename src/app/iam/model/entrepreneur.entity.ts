export class EntrepreneurEntity {
  id: number;
  userId: number;

  constructor(entrepreneur: { id?: number; userId?: number }) {
    this.id = entrepreneur.id || 0;
    this.userId = entrepreneur.userId || 0;
  }
}
