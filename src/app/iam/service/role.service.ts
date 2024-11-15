import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {RoleEntity} from "../model/role.entity";

@Injectable({
  providedIn: 'root'
})
export class RoleService extends BaseService<RoleEntity>{

  constructor() {
    super();
    this.resourceEndpoint = '/roles';
  }
}

