import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CompanyApiService {
  private baseUrl = 'http://localhost:8080/companies';

  constructor(private http: HttpClient) {}

  create(company: any): Observable<any> {
    return this.http.post(this.baseUrl, company);
  }

  setCompanyId(id: number) {
    localStorage.setItem('companyId', id.toString());
  }
}
