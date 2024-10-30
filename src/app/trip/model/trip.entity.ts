export class TripEntity {
  id: number;
  name: string;
  type: string;
  weight: number;
  unload_direction: string;
  unload_location: string;
  unload_date: string;
  expenseId: number;
  alertId: number;
  ongoing_tripId: number;
  vehicleId: number;
  driverId: number;
  entrepreneurId: number;
  destination: string;
  department: string;
  district: string;
  country: string;
  numberPackages: number;
  holderName: string;
  destinationDate: string;
  totalAmount: number;

  constructor(trip: {
    id?: number,
    name?: string,
    type?: string,
    weight?: number,
    unload_direction?: string,
    unload_location?: string,
    unload_date?: string,
    expenseId?: number,
    alertId?: number,
    ongoing_tripId?: number,
    vehicleId?: number,
    driverId?: number,
    entrepreneurId?: number,
    destination?: string,
    country?: string,
    department?: string,
    district?: string,
    numberPackages?: number,
    holderName?: string,
    destinationDate?: string,
    totalAmount?: number
  } = {}) {
    this.id = trip.id || 0;
    this.name = trip.name || '';
    this.type = trip.type || '';
    this.weight = trip.weight || 0;
    this.unload_location = trip.unload_location || '';
    this.unload_direction = trip.unload_direction || '';
    this.unload_date = trip.unload_date || '';
    this.expenseId = trip.expenseId || 0;
    this.alertId = trip.alertId || 0;
    this.ongoing_tripId = trip.ongoing_tripId || 0;
    this.vehicleId = trip.vehicleId || 0;
    this.driverId = trip.driverId || 0;
    this.entrepreneurId = trip.entrepreneurId || 0;
    this.numberPackages = trip.numberPackages || 0;
    this.destination = trip.destination || '';
    this.country = trip.country || '';
    this.department = trip.department || '';
    this.district = trip.district || '';
    this.holderName = trip.holderName || '';
    this.destinationDate = trip.destinationDate || '';
    this.totalAmount = trip.totalAmount || 0;
  }
}
