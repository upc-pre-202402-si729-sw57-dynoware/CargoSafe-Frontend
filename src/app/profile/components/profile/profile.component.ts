import {Component, OnInit} from '@angular/core';
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {NgIf, NgStyle} from "@angular/common";
import {ProfileEntity} from "../../model/profile.entity";
import {ProfileService} from "../../service/profile.service";
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
import {AuthenticationService} from "../../../iam/services/authentication.service";

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
  currentUsername: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private profileService: ProfileService,
    private authenticationService: AuthenticationService
  ) {
    this.profileForm = this.formBuilder.group({
      bio: ['', Validators.required],
      avatar: ['']
    });
  }

  ngOnInit(): void {
    this.authenticationService.currentUsername.subscribe(username => {
      this.currentUsername = username;
      this.loadUserProfile(username);
    });
  }

  loadUserProfile(username: string): void {
    this.profileService.getByUsername(username).subscribe({
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

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.profileForm.patchValue({ avatar: file });
    }
  }

  onUpdate() {
    // Logic to update the profile
    console.log('Profile updated');
  }
}
