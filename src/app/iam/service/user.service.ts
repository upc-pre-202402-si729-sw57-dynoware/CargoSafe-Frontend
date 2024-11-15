import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {UserEntity} from "../model/user.entity";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<UserEntity>{

  constructor() {
    super();
    this.resourceEndpoint = '/users';
  }
}
