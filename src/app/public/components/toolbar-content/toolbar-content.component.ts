import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {LanguageSwitcherComponent} from "../language-switcher/language-switcher.component";
import {Router, RouterLink} from "@angular/router";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {UserApiService} from "../../../iam/service/user-api.service";
import {NgClass, NgIf} from "@angular/common";
import {
  RequestNotificationComponent
} from "../../../request-service/components/request-notification/request-notification.component";
import {MatBadge} from "@angular/material/badge";
import {RequestService} from "../../../request-service/service/request.service";

@Component({
  selector: 'app-toolbar-content',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    MatIconButton,
    MatIcon,
    LanguageSwitcherComponent,
    RouterLink,
    MatMenu,
    MatMenuTrigger,
    MatMenuItem,
    NgIf,
    RequestNotificationComponent,
    MatBadge,
    NgClass
  ],
  templateUrl: './toolbar-content.component.html',
  styleUrl: './toolbar-content.component.css'
})
export class ToolbarContentComponent  {
  showNotifications: boolean = false;
  notificationCount: number = 0;
  isNotificationPanelExpanded: boolean = false;

  constructor(private router: Router, private userApiService: UserApiService, private requestService: RequestService) {}

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }


  loadNotificationCount(): void {
    this.requestService.getAllRequests().subscribe(
      requests => this.notificationCount = requests.length,
      error => console.error('Error loading notification count', error)
    );
  }
  logout() {
    this.userApiService.setLogged(false);
    this.userApiService.setUserId(0);
    this.router.navigate(['/login']);
  }



  onNotificationDeleted() {
    this.notificationCount--;
  }
}
