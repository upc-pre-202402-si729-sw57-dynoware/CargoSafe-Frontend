import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {CompanyEntity} from "../model/company.entity";

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends BaseService<CompanyEntity>{

  constructor() {
    super();
    this.resourceEndpoint = '/companies';
  }
}
