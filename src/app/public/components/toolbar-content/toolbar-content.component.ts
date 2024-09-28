import { Component } from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {LanguageSwitcherComponent} from "../language-switcher/language-switcher.component";

@Component({
  selector: 'app-toolbar-content',
  standalone: true,
  imports: [
    MatToolbar,
    LanguageSwitcherComponent
  ],
  templateUrl: './toolbar-content.component.html',
  styleUrl: './toolbar-content.component.css'
})
export class ToolbarContentComponent {

}
