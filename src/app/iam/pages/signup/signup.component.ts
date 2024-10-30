import { Component } from '@angular/core';
import {RegisterUserComponent} from "../../components/register/register-user/register-user.component";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    RegisterUserComponent

  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

}
