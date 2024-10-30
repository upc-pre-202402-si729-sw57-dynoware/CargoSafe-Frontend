import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/authentication`, { email, password, role });
  }

  signIn(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, { email, password });
  }
}
