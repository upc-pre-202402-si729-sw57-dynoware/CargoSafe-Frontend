import { Component } from '@angular/core';
import {RegisterCompanyComponent} from "../../components/register/register-company/register-company.component";

@Component({
  selector: 'app-signup-company',
  standalone: true,
  imports: [
    RegisterCompanyComponent
  ],
  templateUrl: './signup-company.component.html',
  styleUrl: './signup-company.component.css'
})
export class SignupCompanyComponent {

}
