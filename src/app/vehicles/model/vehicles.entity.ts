export class VehiclesEntity {

  id: number;
  model: string;
  plate: string;
  maxLoad: string;
  volume: string;
  urlImage: string;

  constructor(vehicle: {id?: number, model?: string, plate?: string, max_load?: string, volume?: string, url_image?: string}) {
    this.id = vehicle.id || 0;
    this.model = vehicle.model || '';
    this.plate = vehicle.plate || '';
    this.maxLoad = vehicle.max_load || '';
    this.volume = vehicle.volume || '';
    this.urlImage = vehicle.url_image || '';
  }
}


