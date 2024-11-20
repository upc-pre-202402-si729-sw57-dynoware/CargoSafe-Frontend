import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {MembershipEntity} from "../model/membership.entity";

@Injectable({
  providedIn: 'root'
})

/**
 * Membership Service
 * This class is in charge of managing the membership service
 */

export class MembershipService extends BaseService<MembershipEntity>{

  constructor() {
    super();
    this.resourceEndpoint = '/memberships';
  }
}
