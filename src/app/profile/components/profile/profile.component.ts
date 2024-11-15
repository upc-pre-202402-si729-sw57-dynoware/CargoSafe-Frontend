import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {NgIf, NgStyle} from "@angular/common";
import {ProfileEntity} from "../../model/profile.entity";
import {ProfileService} from "../../service/profile.service";
import {UserApiService} from "../../../iam/service/user-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {
  ToolbarEntrepreneurContentComponent
} from "../../../public/components/toolbar-entrepreneur-content/toolbar-entrepreneur-content.component";
import {Router} from "@angular/router";
import {MatTab, MatTabGroup} from "@angular/material/tabs";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    MatCard,
    NgIf,
    MatCardHeader,
    MatCardContent,
    NgStyle,
    MatCardTitle,
    ReactiveFormsModule,
    MatFormField,
    MatButton,
    MatInput,
    MatLabel,
    ToolbarEntrepreneurContentComponent,
    MatCardSubtitle,
    MatTabGroup,
    MatTab
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent  implements OnInit {
  profileForm: FormGroup;
  user: any;
  profile: ProfileEntity | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private userApiService: UserApiService,
    private profileService: ProfileService
  ) {
    this.profileForm = this.formBuilder.group({
      bio: ['', Validators.required],
      avatar: ['']
    });
  }

  ngOnInit(): void {
    const userId = this.userApiService.getUserId();
    console.log('User ID in ProfileComponent:', userId);

    if (userId) {
      this.userApiService.getById(userId).subscribe({
        next: (user) => {
          this.user = user;
          this.loadUserProfile(userId);
        },
        error: (error) => {
          console.error('Error fetching user:', error);
          this.snackBar.open('Error fetching user data', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('User ID not found', 'Close', { duration: 3000 });
    }
  }

  loadUserProfile(userId: number): void {
    this.profileService.getByUserId(userId).subscribe({
      next: (profile) => {
        this.profile = profile;
        this.profileForm.patchValue({
          bio: profile.bio,
          avatar: profile.avatar
        });
      },
      error: (error) => {
        console.error('Error fetching profile:', error);
        this.snackBar.open('Error fetching profile data', 'Close', { duration: 3000 });
      }
    });
  }

  private message = 'D';

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.snackBar.open('Please fill out all required fields.', 'Close', { duration: 3000 });
      return;
    }

    const userId = this.userApiService.getUserId();
    if (userId && this.profile) {
      const updatedProfile: ProfileEntity = {
        id: this.profile.id,
        userId: this.profile.userId,
        bio: this.profileForm.value.bio,
        avatar: this.profileForm.value.avatar,
        name: this.profile.name,
        email: this.profile.email,
        phone: this.profile.phone
      };

      this.profileService.update(this.profile.id, updatedProfile).subscribe({
        next: () => {
          this.snackBar.open('Profile updated successfully', 'Close', { duration: 3000 });
        },
        error: (error) => {
          console.error('Error updating profile:', error);
          this.snackBar.open('Error updating profile', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.snackBar.open('User I' + this.message + ' not found', 'Close', { duration: 3000 });
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.profileForm.patchValue({ avatar: file });
    }
  }
  onUpdate() {
    // Lógica para actualizar el perfil
    console.log('Profile updated');
  }
}
