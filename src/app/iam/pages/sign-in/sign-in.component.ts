import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {SignInRequest} from "../../model/sign-in.request";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {BaseFormComponent} from "../../../../shared/components/base-form.component";
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";

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
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatButton,
    NgIf,
    MatLabel,
    RouterLink
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent extends BaseFormComponent implements OnInit{
  form!: FormGroup;
  submitted = false;


  /**
   * Constructor
   * @param builder {@link FormBuilder} instance
   * @param authenticationService {@link AuthenticationService} instance
   * @param router
   */
  constructor(private builder: FormBuilder, private authenticationService: AuthenticationService,private router: Router) {
    super();
  }

  /**
   * On Init Event Handler
   * <p>
   *  Initialize the component
   * </p>
   */
    ngOnInit(): void {
      this.form = this.builder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

    /**
     * On Submit Event Handler
     * <p>
     *  Submit the form data to the server
     * </p>
     */
    onSubmit() {
      if (this.form.invalid) return;
      let username = this.form.value.username;
      let password = this.form.value.password;
      const signInRequest = new SignInRequest(username, password);
      this.authenticationService.signIn(signInRequest);
      this.submitted = true;
      this.router.navigate(['/drivers/management']);
    }

}
