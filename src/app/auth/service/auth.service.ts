import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../iam/model/user.entity';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.serverBasePath}/users`;

  constructor(private http: HttpClient) {}

  login(loginDTO: Partial<User>): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${loginDTO.email}&password=${loginDTO.password}`);
  }

  register(registerDTO: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, registerDTO);
  }
}
