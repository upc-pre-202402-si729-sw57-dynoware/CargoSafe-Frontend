import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {UserEntity} from "../../iam/model/user.entity";
import {MembershipEntity} from "../model/membership.entity";

@Injectable({
  providedIn: 'root'
})
export class MembershipService extends BaseService<MembershipEntity>{

  constructor() {
    super();
    this.resourceEndpoint = '/memberships';
  }
}
