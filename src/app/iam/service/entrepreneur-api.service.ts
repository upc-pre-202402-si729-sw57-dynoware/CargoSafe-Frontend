import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EntrepreneurApiService {
  private baseUrl = 'http://localhost:3000/entrepreneurs';

  constructor(private http: HttpClient) {}

  create(entrepreneur: any): Observable<any> {
    return this.http.post(this.baseUrl, entrepreneur);
  }
}
