import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {ProfileEntity} from "../model/profile.entity";

@Injectable({
  providedIn: 'root'
})
export class ProfileService  extends  BaseService<ProfileEntity>{

  constructor() {  super();
    this.resourceEndpoint = '/profiles';
  }
}
