import {Injectable} from '@angular/core';
import {BaseService} from "../../shared/services/base.service";

@Injectable({
  providedIn: 'root'
})
export class DataService extends BaseService<any>{

  constructor() {
    super();
    this.resourceEndpoint = '/data';
  }


}
