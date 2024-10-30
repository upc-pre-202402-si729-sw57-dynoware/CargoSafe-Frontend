export class RequestServiceEntity {
  id: number;
  unload_direction: string;
  type: string;
  numberPackages: number;
  country: string;
  department: string;
  district: string;
  destination: string;
  unload_location: string;
  unload_date: string;
  statusId: number;
  holderName: string;

  constructor(requestService: {id?: number, unload_direction?: string, type?: string, name?: string, country?: string, department?: string, district?: string, destination?: string , unload_location?: string, unload_date?: string, statusId?: number, holderName?: string, numberPackages?: number}) {
    this.id = requestService.id || 0;
    this.unload_direction = requestService.unload_direction || '';
    this.type = requestService.type || '';
    this.numberPackages = requestService.numberPackages || 0;
    this.country = requestService.country || '';
    this.department = requestService.department || '';
    this.district = requestService.district || '';
    this.destination = requestService.destination || '';
    this.unload_location = requestService.unload_location || '';
    this.unload_date = requestService.unload_date || '';
    this.statusId = requestService.statusId || 3; // Default to 3 (pending)
    this.holderName = requestService.holderName || '';
  }
}
