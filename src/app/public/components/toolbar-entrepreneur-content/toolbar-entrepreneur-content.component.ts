import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {LanguageSwitcherComponent} from "../language-switcher/language-switcher.component";

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
    LanguageSwitcherComponent
  ],
  templateUrl: './toolbar-entrepreneur-content.component.html',
  styleUrl: './toolbar-entrepreneur-content.component.css'
})
export class ToolbarEntrepreneurContentComponent {

}
