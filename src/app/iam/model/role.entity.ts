export class RoleEntity {
  id: number;
  type: string;

  constructor(role: { id?: number; type?: string }) {
    this.id = role.id || 0;
    this.type = role.type || '';
  }
}
