import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserEntity } from '../../iam/model/user.entity';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';
  private currentUser: any;

  constructor(private http: HttpClient) {}

  login(loginDTO: UserEntity): Observable<any> {
    return this.http.get<UserEntity[]>(`${this.apiUrl}/users`).pipe(
      map(users => {
        const user = users.find(u => u.email === loginDTO.email && u.password === loginDTO.password);
        if (user) {
          this.setCurrentUser(user);
          return { success: true, user };
        } else {
          throw new Error('Invalid credentials');
        }
      })
    );
  }

  register(registerDTO: UserEntity): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, registerDTO);
  }

  setCurrentUser(user: any): void {
    this.currentUser = user;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }
}
