import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {OrderOnTripEntity} from "../model/order-on-trip.entity";


@Injectable({
  providedIn: 'root'
})

/**
 * OrderOnTrip Service
 * This class is in charge of managing the order on trip service
 * @class
 */
export class OrderOnTripService extends  BaseService<OrderOnTripEntity> {

  constructor() {
    super();
    this.resourceEndpoint = '/ordersOnTrip';
  }

}
