import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, switchMap, tap} from "rxjs";
import {UserApiService} from "./user-api.service";
import {BaseService} from "../../../shared/services/base.service";
import {User} from "../model/user.entity";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationApiService extends BaseService<User> {
  constructor(http: HttpClient) {
    super();
    this.http = http;
    this.basePath = environment.serverBasePath;
    this.extraUrl= environment.authenticationURL;
  }

  signUp(username: string, password: string, role: string) {
    const user = {
      "username": username,
      "password": password,
      "roles": [role]
    };
    return this.http.post(this.resourcePath() + '/sign-up', user, this.httOptions)
      .pipe(catchError(this.handleError));
  }

  signIn(username: string, password: string) {
    const user = {
      "username": username,
      "password": password
    };
    return this.http.post(this.resourcePath() + '/sign-in', user, this.httOptions)
      .pipe(catchError(this.handleError))
      .pipe(tap((response: any) => {
        this.newToken(response["token"]);
      }));
  }
}
