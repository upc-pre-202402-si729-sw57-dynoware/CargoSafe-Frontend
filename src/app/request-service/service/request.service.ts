import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {RequestServiceEntity} from "../model/request-service.entity";
import {catchError, Observable, Subject, tap, throwError} from "rxjs";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class RequestService extends BaseService<RequestServiceEntity> {
  constructor(http: HttpClient, private notificationService: NotificationService) {
    super();
    this.http = http;
    this.resourceEndpoint = '/requestServiceTrips';
  }

  acceptRequest(id: number): Observable<any> {
    const url = `${this.basePath}/status`;
    const statusUpdate = { id: id, status: 'accepted', requestServiceTripId: id };
    return this.http.post(url, statusUpdate, this.httOptions).pipe(
      tap(() => this.notificationService.showNotification(
        'Solicitud aceptada',
        'The trip you requested has been approved.',
        'success',
        'path/to/success-image.jpg'
      )),
      catchError(this.handleError)
    );
  }

  private acceptedTrips: Set<number> = new Set<number>();

  addTrip(tripId: number): void {
    this.acceptedTrips.add(tripId);
  }

  hasTrip(tripId: number): boolean {
    return this.acceptedTrips.has(tripId);
  }

  rejectRequest(id: number): Observable<any> {
    const url = `${this.basePath}/status`;
    const statusUpdate = { id: id, status: 'rejected', requestServiceTripId: id };
    return this.http.post(url, statusUpdate, this.httOptions).pipe(
      tap(() => this.notificationService.showNotification(
        'Solicitud rechazada',
        'The trip you requested has been rejected.',
        'error',
        'path/to/error-image.jpg'
      )),
      catchError(this.handleError)
    );
  }
}
