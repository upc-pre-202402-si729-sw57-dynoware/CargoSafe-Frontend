export class UserEntity {
  id: number;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
  RUC: string;
  address: string;
  role_id: number;
  company_id: number | null;
  entrepreneur_id: number | null;

  constructor(user: {
    id?: number;
    name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
    password?: string;
    RUC?: string;
    address?: string;
    role_id?: number;
    company_id?: number | null;
    entrepreneur_id?: number | null;
  }) {
    this.id = user.id || 0;
    this.name = user.name || '';
    this.last_name = user.last_name || '';
    this.email = user.email || '';
    this.phone = user.phone || '';
    this.password = user.password || '';
    this.RUC = user.RUC || '';
    this.address = user.address || '';
    this.role_id = user.role_id || 0;
    this.company_id = user.company_id || null;
    this.entrepreneur_id = user.entrepreneur_id || null;
  }
}
