import { Component } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { FormsModule } from '@angular/forms';
import { UserEntity } from '../../../iam/model/user.entity';
import {NgIf} from "@angular/common";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    RouterLink,
    MatError,
    MatButton,
    MatFormField,
    MatLabel,
    MatInput
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginDTO: UserEntity = new UserEntity({});

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.loginDTO).subscribe(response => {
      console.log('Login successful', response);
      this.router.navigate(['/home']);
    }, error => {
      console.error('Login failed', error);
    });
  }
}
