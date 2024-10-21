import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {TripEntity} from "../model/trip.entity";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TripService extends BaseService<TripEntity> {

  constructor() {
    super();
    this.resourceEndpoint = '/trips';
  }

  getTrips(): Observable<TripEntity[]> {
    return this.getAll();
  }
}
