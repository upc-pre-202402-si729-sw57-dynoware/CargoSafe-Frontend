import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {LanguageSwitcherComponent} from "../language-switcher/language-switcher.component";
import {RouterLink} from "@angular/router";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {TranslateModule} from "@ngx-translate/core";

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
    TranslateModule
  ],
  templateUrl: './toolbar-content.component.html',
  styleUrl: './toolbar-content.component.css'
})
export class ToolbarContentComponent {

}
