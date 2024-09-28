import { Injectable } from '@angular/core';
import { Merchandise } from '../model/merchandise.entity';
import { HttpClient } from '@angular/common/http';
import { BaseService } from '../../shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class MerchandiseService extends BaseService<Merchandise> {

  constructor(http: HttpClient) {
    super(http);
    this.resourceEndpoint = '/merchandise';
  }
}
