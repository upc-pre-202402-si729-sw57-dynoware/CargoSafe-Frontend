export class RoleEntity {
  id: number;
  name: string;

  constructor(role: { id?: number; name?: string }) {
    this.id = role.id || 0;
    this.name = role.name || '';
  }
}
