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

 // private baseUrl = 'http://localhost:3000/profiles';

  constructor(private httpClient: HttpClient) {
    super();
    this.resourceEndpoint = '/profiles';
  }

  override create(profile: ProfileEntity): Observable<ProfileEntity> {
    return this.http.post<ProfileEntity>(this.baseUrl, profile);
  }

  override update(id: number, profile: ProfileEntity): Observable<ProfileEntity> {
    const formData = new FormData();
    formData.append('bio', profile.bio);

    return this.http.put<ProfileEntity>(`${this.resourcePath()}/${id}`, formData);
  }

  getByUserId(userId: number): Observable<ProfileEntity> {
    return this.http.get<ProfileEntity[]>(`${this.baseUrl}?userId=${userId}`).pipe(
      map(profiles => profiles[0])
    );
  }

  getByUsername(username: string): Observable<ProfileEntity> {
    return this.http.get<ProfileEntity>(`${this.baseUrl}/username/${username}`);
  }
}
