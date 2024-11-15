export class StatusEntity {
  id: number;
  status: string;

  constructor(data: { id?: number, status?: string }) {
    this.id = data.id || 0;
    this.status = data.status || '';
  }
}
