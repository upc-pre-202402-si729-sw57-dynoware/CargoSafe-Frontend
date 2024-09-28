import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TripService extends BaseS<Tr> {

  constructor() {
    super();
    this.resourceEndpoint = '/trips';
  }
}
