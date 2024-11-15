import { Component } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatButton,
    MatCardActions,
    RouterLink
  ],
  templateUrl: './register-user.component.html',
  styleUrl: './register-user.component.css'
})
export class RegisterUserComponent {

  constructor(private router: Router) {
  }

  registerEntrepreneur() {
    this.router.navigate(['/register/entrepreneur']);
  }

  registerCompany() {
    this.router.navigate(['/register/company']);
  }

}
