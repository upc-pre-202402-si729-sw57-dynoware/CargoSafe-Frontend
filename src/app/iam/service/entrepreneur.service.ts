import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {EntrepreneurEntity} from "../model/entrepreneur.entity";

@Injectable({
  providedIn: 'root'
})
export class EntrepreneurService extends BaseService<EntrepreneurEntity>{

  constructor() {
    super();
    this.resourceEndpoint = '/entrepreneurs';
  }
}
