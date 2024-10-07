export class MembershipEntity {
  id: number;
  type: string;
  price: number;
  duration: string;
  description: string;

  constructor(membership: { id?: number; type?: string; price?: number; duration?: string; description?: string }) {
    this.id = membership.id || 0;
    this.type = membership.type || '';
    this.price = membership.price || 0;
    this.duration = membership.duration || '';
    this.description = membership.description || '';
  }
}
