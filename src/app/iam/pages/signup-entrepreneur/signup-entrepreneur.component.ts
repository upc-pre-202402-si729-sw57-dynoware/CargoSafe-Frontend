import { Component } from '@angular/core';
import {
  RegisterEntrepreneurComponent
} from "../../components/register/register-entrepreneur/register-entrepreneur.component";

@Component({
  selector: 'app-signup-entrepreneur',
  standalone: true,
  imports: [
    RegisterEntrepreneurComponent
  ],
  templateUrl: './signup-entrepreneur.component.html',
  styleUrl: './signup-entrepreneur.component.css'
})
export class SignupEntrepreneurComponent {

}
