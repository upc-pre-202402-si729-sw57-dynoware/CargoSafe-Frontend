import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
//importar UserEntity
import {UserEntity} from "../../../iam/model/user.entity";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getUserById(userId: number): Observable<UserEntity> {
    return this.http.get<UserEntity>(`${this.apiUrl}/${userId}`);
  }

  updateUser(user: UserEntity): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${user.id}`, user);
  }
}
