import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {SignInRequest} from "../../model/sign-in.request";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

/**
 * Sign in component
 */
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatError,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatButton
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent  implements OnInit {
  form!: FormGroup;
  submitted = false;

  /**
   * Constructor
   * @param builder {@link FormBuilder} - form builder
   * @param authenticationService {@link AuthenticationService} - authentication service
   */
  constructor(private builder: FormBuilder, private authenticationService: AuthenticationService) {

  }

  /**
   * On init Event Handler
   */
  ngOnInit(): void {
    this.form = this.builder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * On submit Event Handler
   */
  onSubmit() {
    if (this.form.invalid) return;
    let username = this.form.value.username;
    let password = this.form.value.password;
    const signInRequest = new SignInRequest(username, password);
    this.authenticationService.signIn(signInRequest);
    this.submitted = true;
  }
  protected isInvalidFormControl(form: FormGroup, controlName: string) {
    return form.controls[controlName].invalid &&
        form.controls[controlName].touched;
  }

  private errorMessageForControl(controlName: string, errorKey: string) {
    switch (errorKey) {
      case 'required': return `The field ${controlName} is required`;
        // Add more cases here
      default: return `The field ${controlName} is invalid`;
    }
  }

  protected getErrorMessagesForControl(form: FormGroup, controlName: string) {
    const control = form.controls[controlName];
    let errorMessages = '';
    let errors = control.errors;
    if (!errors) return errorMessages;
    Object.keys(errors).forEach((errorKey) =>
        errorMessages += this.errorMessageForControl(controlName, errorKey));
    return errorMessages;
  }
}
