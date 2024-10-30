import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserEntity } from '../../iam/model/user.entity';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.serverBasePath}/users`;

  constructor(private http: HttpClient) {}

  login(loginDTO: Partial<UserEntity>): Observable<UserEntity[]> {
    return this.http.get<UserEntity[]>(`${this.apiUrl}?email=${loginDTO.email}&password=${loginDTO.password}`);
  }

  register(registerDTO: UserEntity): Observable<UserEntity> {
    return this.http.post<UserEntity>(this.apiUrl, registerDTO);
  }
}
