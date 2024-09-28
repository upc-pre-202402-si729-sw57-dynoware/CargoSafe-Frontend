import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {VehicleEntity} from "../model/vehicle.entity";

@Injectable({
  providedIn: 'root'
})
export class VehicleService extends  BaseService<VehicleEntity>{

  constructor() {
    super();
    this.resourceEndpoint = 'vehicles';

  }
}
