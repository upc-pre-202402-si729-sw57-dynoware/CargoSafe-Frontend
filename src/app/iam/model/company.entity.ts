export class CompanyEntity {
  id: number;
  companyname: string;
  membershipId: number;
  userId: number;

  constructor(company: { id?: number; companyname?: string; membershipId?: number; userId?: number }) {
    this.id = company.id || 0;
    this.companyname = company.companyname || '';
    this.membershipId = company.membershipId || 0;
    this.userId = company.userId || 0;
  }
}
