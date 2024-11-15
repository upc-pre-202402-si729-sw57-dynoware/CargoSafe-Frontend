import { Injectable } from '@angular/core';
import {BaseService} from "../../../shared/services/base.service";

import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {ProfileEntity} from "../../profile/model/profile.entity";
import {map} from "rxjs/operators";
import {User} from "../model/user.entity";

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private baseUrl = 'http://localhost:3000/users';
  private profileUrl = 'http://localhost:3000/profiles';
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
    console.log('Setting user ID:', user_id);
    this.userId = user_id;
  }

  getUserId(): number  | null {
   /* if (typeof window !== 'undefined' && window.localStorage) {
      const user_id = localStorage.getItem('user_id');
      return user_id ? parseInt(user_id) : 0;
    }
    return 0;*/
    console.log('Getting user ID:', this.userId);
    return this.userId;
  }

  getNotificationsByUserId(user_id: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/${user_id}/notifications`, this.httOptions)
      .pipe(catchError(this.handleError));
  }

  create(user: any): Observable<any> {
    return this.http.post<User>(this.baseUrl, user, this.httOptions).pipe(
      switchMap((createdUser: User) => {
        const profile: ProfileEntity = {
          id: 0,
          userId: createdUser.id,
          bio: '',
          avatar: ''
        };
        return this.http.post<ProfileEntity>(this.profileUrl, profile, this.httOptions);
      }),
      catchError(this.handleError)
    );
  }
  update(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, user, this.httOptions)
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

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`, this.httOptions)
      .pipe(catchError(this.handleError));
  }

  getByEmail(email: string): Observable<User> {
    return this.http.get<User[]>(`${this.baseUrl}?email=${email}`, this.httOptions).pipe(
      map(users => users[0]),
      catchError(this.handleError)
    );
  }


}
