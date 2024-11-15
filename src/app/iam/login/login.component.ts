import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthenticationApiService} from "../service/authentication-api.service";
import {UserApiService} from "../service/user-api.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    RouterLink,
    NgIf,
    MatCardTitle,
    MatLabel,
    MatError
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string | null = null;
  loginAttempts: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authenticationApiService: AuthenticationApiService,
    private userApiService: UserApiService
  ) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    if (this.userApiService.isLogged()) {
      this.router.navigateByUrl('/list-request-history');
    }
  }

  login() {
    if (this.loginAttempts > 10) {
      this.errorMessage = "Has alcanzado el límite de intentos de inicio de sesión. Por favor, inténtalo más tarde.";
      return;
    }

    this.loginAttempts++;

    this.authenticationApiService.signIn(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      (response: any) => {
        console.log(response);
        const userId = response.id;
        const roleId = response.roleId;
        this.userApiService.setUserId(userId);
        this.userApiService.setLogged(true);

        if (roleId === 2) {
          this.router.navigateByUrl('/home-company');
        } else if (roleId === 3) {
          this.router.navigateByUrl('/home-entrepreneur');
        } else {
          this.router.navigateByUrl('/login');
        }

        this.snackBar.open('Welcome ', 'Close', {duration: 2000});
      },
      error => {
        this.snackBar.open('Error. Credentials not found', 'Close', {duration: 3000});
      }
    );


    this.loginAttempts++;

    this.authenticationApiService.signIn(this.loginForm.value.email, this.loginForm.value.password).subscribe(
      (response: any) => {
        const userId = response.id;
        const roleId = response.roleId;
        this.userApiService.setUserId(userId);
        this.userApiService.setLogged(true);

        if (roleId === 2) {
          this.router.navigateByUrl('/home-company');
        } else if (roleId === 3) {
          this.router.navigateByUrl('/home-entrepreneur');
        } else {
          this.router.navigateByUrl('/login');
        }

        this.snackBar.open('Welcome 🤗', 'Close', {duration: 2000});
      },
      error => {
        this.snackBar.open('Error. Credentials not found😥', 'Close', {duration: 3000});
      }
    );
  }
}
