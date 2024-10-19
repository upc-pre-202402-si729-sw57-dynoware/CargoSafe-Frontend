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
export class LanguageSwitcherComponent {  protected currentLang = 'en';

  protected languages = ['en', 'es'];



  constructor(private translate: TranslateService) {

    this.currentLang = translate.currentLang;

    this.translate.setDefaultLang('en');

    this.translate.use('en');

  }

  useLanguage(language: string) {

    this.translate.use(language);

  }



}
