import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {LanguageSwitcherComponent} from "../language-switcher/language-switcher.component";
import {RouterLink} from "@angular/router";
import {RequestService} from "../../../request-service/service/request.service";
import {NgForOf, NgIf} from "@angular/common";
import {Subject, takeUntil} from "rxjs";
import {MatBadge} from "@angular/material/badge";
import {StatusEntity} from "../../../request-service/model/status.entity";
import {StatusService} from "../../../request-service/service/status.service";
import {NotificationsComponent} from "../../../request-service/components/notifications/notifications.component";

@Component({
  selector: 'app-toolbar-entrepreneur-content',
  standalone: true,
  imports: [
    MatToolbar,
    MatButton,
    MatIconButton,
    MatIcon,
    MatMenuTrigger,
    MatMenuItem,
    MatMenu,
    LanguageSwitcherComponent,
    RouterLink,
    NgIf,
    NgForOf,
    MatBadge,
    NotificationsComponent
  ],
  templateUrl: './toolbar-entrepreneur-content.component.html',
  styleUrl: './toolbar-entrepreneur-content.component.css'
})
export class ToolbarEntrepreneurContentComponent  implements OnInit, OnDestroy {
  notificationCount: number = 0;
  notifications: StatusEntity[] = [];
  private unsubscribe$ = new Subject<void>();

  constructor(private statusService: StatusService) {}

  ngOnInit(): void {
    this.loadStatuses();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  loadStatuses(): void {
    this.statusService.getAllStatuses().pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe({
      next: (statuses) => {
        this.notifications = statuses;
        this.notificationCount = this.notifications.length;
      },
      error: (err) => {
        console.error('Failed to load statuses', err);
      }
    });
  }

  removeNotification(index: number): void {
    this.notifications.splice(index, 1);
    this.notificationCount = this.notifications.length;
  }
}
