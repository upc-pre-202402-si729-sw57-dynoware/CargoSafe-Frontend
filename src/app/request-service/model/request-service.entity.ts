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
  distance: number | null | undefined;
  statusId: number;
  holderName: string;
  pickupAddress: string;
  pickupLat: number;
  pickupLng: number;
  destinationAddress: string;
  destinationLat: number;
  destinationLng: number;
  loadDetail: any;
  weight: any;

  constructor(requestService: {
    id?: number,
    unload_direction?: string,
    type?: string,
    name?: string,
    country?: string,
    department?: string,
    district?: string,
    destination?: string,
    unload_location?: string,
    unload_date?: string,
    distance?: number | null,
    statusId?: number,
    holderName?: string,
    numberPackages?: number,
    pickupAddress?: string,
    pickupLat?: number,
    pickupLng?: number,
    destinationAddress?: string,
    destinationLat?: number,
    destinationLng?: number,
    loadDetail?: any,
    weight?: any
  }) {
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
    this.distance = requestService.distance ?? null;
    this.statusId = requestService.statusId || 3;
    this.holderName = requestService.holderName || '';
    this.pickupAddress = requestService.pickupAddress || '';
    this.pickupLat = requestService.pickupLat || 0;
    this.pickupLng = requestService.pickupLng || 0;
    this.destinationAddress = requestService.destinationAddress || '';
    this.destinationLat = requestService.destinationLat || 0;
    this.destinationLng = requestService.destinationLng || 0;
    this.loadDetail = requestService.loadDetail || '';
    this.weight = requestService.weight || '';
  }
}
