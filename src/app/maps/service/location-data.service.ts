import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LocationDataEntity} from '../model/location-data.entity';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * Location Data Service
 * This class is in charge of managing the location data service
 * @class
 */

export class LocationDataService {

  private apiUrl = 'https://your-backend-url.com/api/locations';

  constructor(private http: HttpClient) { }

  sendLocationData(data: LocationDataEntity): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
