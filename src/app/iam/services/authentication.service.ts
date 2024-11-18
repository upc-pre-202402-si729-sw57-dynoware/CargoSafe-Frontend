import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";
import {Router} from "@angular/router";
import {SignUpRequest} from "../model/sign-up.request";
import {SignUpResponse} from "../model/sign-up.response";
import {SignInRequest} from "../model/sign-in.request";
import {SignInResponse} from "../model/sign-in.response";

/**
 * Authentication service
 * <p>
 *   This service is responsible for handling user authentication.
 *   It provides methods for signing up, signing in, and signing out.
 *   It also provides observables for the signed in state, the current user id, and the current username.
 * </p>
 */
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  basePath: string = `${environment.serverBasePath}`;
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  // states
  private signedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private signedInUserId: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private signedInUsername: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private signedInUserRoles: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  /**
   * Constructor
   * @param router the router
   * @param http the http client
   */
  constructor(private router: Router, private http: HttpClient) { }

  /**
   * Validates if the user is signed in
   */
  get isSignedIn() {
    return this.signedIn.asObservable();
  }
  get currentUserRoles() {
    return this.signedInUserRoles.asObservable();
  }
  /**
   * Gets the current user id
   */
  get currentUserId() {
    return this.signedInUserId.asObservable();
  }

  /**
   * Gets the current username
   */
  get currentUsername() {
    return this.signedInUsername.asObservable();
  }

  // actions

  /**
   * Signs up a new user
   * <p>
   *   This method sends a sign-up request to the server.
   *   If the request is successful, the user is redirected to the sign-in page.
   *   If the request fails, an error message is logged and the user is redirected to the sign-up page.
   *   The user is not signed in automatically after signing up.
   * </p>
   * @param signUpRequest The {@link SignUpRequest} object
   */
  signUp(signUpRequest: SignUpRequest): Observable<SignUpResponse> {
    return this.http.post<SignUpResponse>(`${this.basePath}/authentication/sign-up`, signUpRequest, this.httpOptions);
  }

  signIn(signInRequest: SignInRequest): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${this.basePath}/authentication/sign-in`, signInRequest, this.httpOptions).pipe(
      tap(response => {
        console.log('SignInResponse:', response); // Debugging log
        if (!response) {
          console.error('No response received from server');
          return;
        }
        if (!response.roles) {
          console.error('Roles not defined in response:', response);
          return;
        }
        this.signedIn.next(true);
        this.signedInUserId.next(response.id);
        this.signedInUsername.next(response.username);
        this.signedInUserRoles.next(response.roles); // Ensure roles are set
        localStorage.setItem('token', response.token);
        // Navigate based on roles
        if (response.roles.includes('ROLE_ENTREPRENEUR')) {
          this.router.navigate(['/home-entrepreneur']).then();
        } else if (response.roles.includes('ROLE_COMPANY')) {
          this.router.navigate(['/home-company']).then();
        }
      })
    );
  }

  /**
   * Signs out the current user
   * <p>
   *   This method signs out the current user and redirects them to the sign-in page.
   * </p>
   */
  signOut() {
    this.signedIn.next(false);
    this.signedInUserId.next(0);
    this.signedInUsername.next('');
    localStorage.removeItem('token');
    this.router.navigate(['/sign-in']).then();
  }
  updateSignedInUserRoles(roles: string[]): void {
    this.signedInUserRoles.next(roles);
  }
}
