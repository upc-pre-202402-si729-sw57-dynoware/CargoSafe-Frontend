import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {SignUpRequest} from "../../model/sign-up.request";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

/**
 * Sign up component
 */
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatError,
    MatCardHeader,
    MatFormField,
    MatInput,
    ReactiveFormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  form!: FormGroup;
  submitted: boolean = false;
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
    const signUnRequest = new SignUpRequest(username, password);
    this.authenticationService.signUp(signUnRequest);
    this.submitted = true;
  }
}
