import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {DriverEntity} from "../model/driver.entity";
import {catchError, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DriverService extends BaseService<DriverEntity> {

  constructor() {
    super();
    this.resourceEndpoint = '/drivers';
  }

  public override getAll(): Observable<DriverEntity[]> {
    return this.http.get<DriverEntity[]>(this.resourcePath(), this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
