import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {ProfileEntity} from "../model/profile.entity";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProfileService  extends BaseService<ProfileEntity> {

  constructor(private httpClient: HttpClient) {
    super();
    this.resourceEndpoint = '/profiles';
  }

  override update(id: number, profile: ProfileEntity): Observable<ProfileEntity> {
    const requestPayload = {
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      street: profile.street,
      number: profile.number,
      city: profile.city,
      postalCode: profile.postalCode,
      country: profile.country
    };
    return this.http.put<ProfileEntity>(`${this.resourcePath()}/${id}`, requestPayload, this.httOptions);
  }

  getByUserId(userId: number): Observable<ProfileEntity> {
    return this.http.get<ProfileEntity[]>(`${this.baseUrl}?userId=${userId}`).pipe(
      map(profiles => profiles[0])
    );
  }


  override getById(profileId: number): Observable<ProfileEntity> {
    return this.http.get<ProfileEntity>(`${this.baseUrl}/profiles/${profileId}`);
  }


  getByUsername(username: string): Observable<ProfileEntity> {
    return this.http.get<ProfileEntity>(`${this.baseUrl}/profiles/username/${username}`);
  }
}
