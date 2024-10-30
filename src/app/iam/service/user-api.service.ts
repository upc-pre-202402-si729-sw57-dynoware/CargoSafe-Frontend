import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";
import {UserEntity} from "../model/user.entity";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private baseUrl = 'http://localhost:3000/users';
  private httOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  private isLoggedIn = false;
  private userId: number | null = null;
  constructor(private http: HttpClient) {}

  setIsCompany(isCompany: boolean) {
   /* if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('isCompany', String(isCompany));
    }*/
  }

  setLogged(isLogged: boolean) {
    /*if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('isLogged', String(isLogged));
    }*/
    this.isLoggedIn = isLogged;
  }

  isLogged(): boolean {
    /*if (typeof window !== 'undefined' && window.localStorage) {
      const logged = localStorage.getItem('isLogged');
      return logged === 'true';
    }
    return false;*/
    return this.isLoggedIn;
  }

  setUserId(user_id: number) {
   /* if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('user_id', user_id.toString());
    }*/
    this.userId = user_id;
  }

  getUserId(): number  | null {
   /* if (typeof window !== 'undefined' && window.localStorage) {
      const user_id = localStorage.getItem('user_id');
      return user_id ? parseInt(user_id) : 0;
    }
    return 0;*/
    return this.userId;
  }

  getNotificationsByUserId(user_id: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/${user_id}/notifications`, this.httOptions)
      .pipe(catchError(this.handleError));
  }

  create(user: any): Observable<any> {
    return this.http.post(this.baseUrl, user, this.httOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(`An error occurred: ${error.error.message}`);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
