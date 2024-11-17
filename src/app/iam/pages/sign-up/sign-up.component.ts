import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {SignUpRequest} from "../../model/sign-up.request";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {BaseFormComponent} from "../../../../shared/components/base-form.component";
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";

/**
 * Sign up component
 */
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatError,
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    NgIf,
    MatLabel,
    RouterLink
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent  implements OnInit {
  form!: FormGroup;
  submitted = false;

  constructor(
    private builder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['ROL_ENTREPRENEUR', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const { username, password, role } = this.form.value;
    const signUpRequest = new SignUpRequest(username, password, role);
    this.authenticationService.signUp(signUpRequest).subscribe({
      next: () => {
        this.submitted = true;
        this.router.navigate(['/sign-in']);
      },
      error: (error) => {
        console.error('Error signing up', error);
      }
    });}
}
