export class CompanyEntity {
  id: number;
  company_name: string;
  membership_id: number;

  constructor(company: { id?: number; company_name?: string; membership_id?: number }) {
    this.id = company.id || 0;
    this.company_name = company.company_name || '';
    this.membership_id = company.membership_id || 0;
  }
}
