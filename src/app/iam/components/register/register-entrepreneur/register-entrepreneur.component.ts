import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import { MAT_DATE_LOCALE } from '@angular/material/core';
import {DateAdapter} from "chart.js";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatIcon} from "@angular/material/icon";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {NgIf} from "@angular/common";
import {MatCard, MatCardContent, MatCardTitle} from "@angular/material/card";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {AuthenticationApiService} from "../../../service/authentication-api.service";
import {UserApiService} from "../../../service/user-api.service";
import {EntrepreneurApiService} from "../../../service/entrepreneur-api.service";

@Component({
  selector: 'app-register-entrepreneur',
  standalone: true,
  imports: [
    MatIcon,
    MatError,
    NgIf,
    MatCardTitle,
    MatCard,
    ReactiveFormsModule,
    MatCardContent,
    MatFormField,
    MatInput,
    MatButton,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker,
    MatLabel,
    MatError
  ],
  templateUrl: './register-entrepreneur.component.html',
  styleUrl: './register-entrepreneur.component.css',
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-PE'}
  ]
})
export class RegisterEntrepreneurComponent {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authenticationApiService: AuthenticationApiService,
    private userApiService: UserApiService,
    private entrepreneurApiService: EntrepreneurApiService
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phone: ['', Validators.required],
      location: ['', Validators.required],
      description: ['']
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.snackBar.open('Please complete all required fields.', 'Close', {duration: 3000});
      return;
    }

    const {email, password, name, phone, location, description} = this.registerForm.value;

    this.registerForm.disable();

    this.authenticationApiService.signUp(email, password, 'ROLE_ENTREPRENEUR').subscribe({
      next: (response: any) => {
        const userId = response.id;
        const user = {
          id: userId,
          name,
          lastname: '',
          email,
          phone,
          password,
          roleId: 3
        };

        this.userApiService.create(user).subscribe({
          next: () => {
            const entrepreneur = {id: 0, name, location, description, userId};
            this.entrepreneurApiService.create(entrepreneur).subscribe({
              next: () => {
                this.router.navigateByUrl('/login');
                this.snackBar.open(`Welcome ${name}`, 'Close', {duration: 2000});
              },
              error: (error) => {
                this.snackBar.open('Error registering the entrepreneur', 'Close', {duration: 5000});
                console.error(error);
                this.registerForm.enable();
              }
            });
          },
          error: (error) => {
            this.snackBar.open('Error registering the user', 'Close', {duration: 5000});
            console.error(error);
            this.registerForm.enable();
          }
        });
      },
      error: () => {
        this.snackBar.open('Error registering the user', 'Close', {duration: 3000});
        this.registerForm.enable();
      }
    });
  }
  goBack() {
    window.history.back();
  }
}
