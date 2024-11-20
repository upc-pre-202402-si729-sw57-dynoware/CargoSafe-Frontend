/**
 * Location Data Entity
 * This class is in charge of managing the location data entity
 */

export class LocationDataEntity {
  constructor(
    public pickupAddress: string,
    public pickupLat: number,
    public pickupLng: number,
    public destinationAddress: string,
    public destinationLat: number,
    public destinationLng: number
  ) {}
}
