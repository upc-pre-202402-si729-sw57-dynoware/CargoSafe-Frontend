import { Injectable } from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {Trip} from "../model/trip.entity";

@Injectable({providedIn: 'root'})
export class TripService extends BaseService<Trip> {

  constructor() {
    super();
    this.resourceEndpoint = '/trips';
  }
}
