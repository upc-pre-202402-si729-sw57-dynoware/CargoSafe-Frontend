import { Component } from '@angular/core';
import {UserEntity} from "../../../iam/model/user.entity";
import {Router} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-profile-edit',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardContent,
    MatFormField,
    MatInput,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './profile-edit.component.html',
  styleUrl: './profile-edit.component.css'
})
export class ProfileEditComponent {
  user: UserEntity | null = null;
  userId: any;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId')
    this.usersService. getUserById(this.userId).subscribe(user  => {
      this.user = user;
    });
  }

  updateProfile(): void {
    if (this.user) {
      this.usersService.updateUser(this.user).subscribe(() => {
        this.router.navigate(['/profile']);
      });
    }
  }

  cancelEdit(): void {
    this.router.navigate(['/profile']);
  }
}
