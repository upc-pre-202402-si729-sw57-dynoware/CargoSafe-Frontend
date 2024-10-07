import {Component, HostListener, OnInit, signal} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MainComponent} from "./main/main.component";
import {ToolbarContentComponent} from "./public/components/toolbar-content/toolbar-content.component";
import {LeftSidebarComponent} from "./public/components/left-sidebar/left-sidebar.component";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponent, ToolbarContentComponent, LeftSidebarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {}

  shouldShowToolbar(): boolean {
    return !['/login', '/register'].includes(this.router.url);
  }

  isLeftSidebarCollapsed = signal<boolean>(false);
  screenWidth = signal<number>(window.innerWidth);

  @HostListener('window:resize')
  onResize() {
    this.screenWidth.set(window.innerWidth);
    if (this.screenWidth() < 768) {
      this.isLeftSidebarCollapsed.set(true);
    }
  }

  ngOnInit(): void {
    this.isLeftSidebarCollapsed.set(this.screenWidth() < 768);
  }

  changeIsLeftSidebarCollapsed(isLeftSidebarCollapsed: boolean): void {
    this.isLeftSidebarCollapsed.set(isLeftSidebarCollapsed);
  }
}
