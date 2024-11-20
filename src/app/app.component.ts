import {Component, HostListener, OnInit, signal} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {MainComponent} from "./main/main.component";
import {LeftSidebarComponent} from "./public/components/left-sidebar/left-sidebar.component";
import {NgIf} from "@angular/common";
import {ToolbarContentComponent} from "./public/components/toolbar-content/toolbar-content.component";
import {LanguageSwitcherComponent} from "./public/components/language-switcher/language-switcher.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainComponent, ToolbarContentComponent, LeftSidebarComponent, NgIf, LanguageSwitcherComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  {










}
