import {Component, OnInit} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from "@angular/material/card";
import {UserEntity} from "../../../iam/model/user.entity";
import {NgIf} from "@angular/common";
import {UsersService} from "../../services/users.service";
import {Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-profile-management',
  standalone: true,
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    NgIf,
    MatIcon,
  ],
  templateUrl: './profile-management.component.html',
  styleUrl: './profile-management.component.css'
})
export class ProfileManagementComponent implements OnInit {
  user: UserEntity | null = null;
  userId: any;

  constructor(private usersService: UsersService, private router: Router) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    if (this.userId) {
      this.usersService.getUserById(this.userId).subscribe(user => {
        this.user = user;
      });
    } else {
      console.error('User ID not found in localStorage');
    }
  }

  editProfile(): void {
    this.router.navigate(['/profile/edit']);
  }
}
