export class UserEntity {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  RUC: string;
  address: string;
  roleId: number;

  constructor(user: {
    id?: number;
    name?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    password?: string;
    RUC?: string;
    address?: string;
    roleId?: number;
  }) {
    this.id = user.id || 0;
    this.name = user.name || '';
    this.lastname = user.lastname || '';
    this.email = user.email || '';
    this.phone = user.phone || '';
    this.password = user.password || '';
    this.RUC = user.RUC || '';
    this.address = user.address || '';
    this.roleId = user.roleId || 0;
  }
}
