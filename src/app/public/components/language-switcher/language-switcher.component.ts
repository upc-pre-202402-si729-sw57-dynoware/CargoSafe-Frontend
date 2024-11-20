import { Component } from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [
    MatButtonToggleGroup,
    MatButtonToggle
  ],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.css'
})

/**
 * Language switcher component
 * This class is in charge of managing the language switcher component
 * @class
 */

export class LanguageSwitcherComponent {  protected currentLang = 'en';

  protected languages = ['en', 'es'];



  constructor(private translate: TranslateService) {

    this.currentLang = translate.currentLang;

  }

  useLanguage(language: string) {

    this.translate.use(language);

  }



}
