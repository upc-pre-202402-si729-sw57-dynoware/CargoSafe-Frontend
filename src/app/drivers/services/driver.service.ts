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

  /**
   * Create a driver
   * @param driver
   * @returns the driver
   * This method is used to create a driver
   */

  public override create(driver: DriverEntity): Observable<DriverEntity> {
    return this.http.post<DriverEntity>(this.resourcePath(), driver, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  /**
   * Update a driver
   * @param driverId
   * @param driver
   * This method is used to update a driver
   */

  public override update(driverId: number, driver: DriverEntity): Observable<DriverEntity> {
    console.log(`Updating driver with ID: ${driverId}`, driver);
    return this.http.put<DriverEntity>(`${this.resourcePath()}/${driverId}`, driver, this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  /**
   * Delete a driver
   * @param driverId
   * This method is used to delete a driver
   */

  public override delete(driverId: number): Observable<void> {
    console.log(`Deleting driver with ID: ${driverId}`);
    return this.http.delete<void>(`${this.resourcePath()}/${driverId}`, this.httOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  /**
   * Get all drivers
   * @returns all drivers
   * This method is used to get all drivers
   */

  public override getAll(): Observable<DriverEntity[]> {
    return this.http.get<DriverEntity[]>(this.resourcePath(), this.httOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
