import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  public activeLanguage: Subject<string> = new Subject<string>();

  constructor(private translateService: TranslateService) {
    this.activeLanguage.next('it');
  }

  public changeLanguage(language: string): void {

    if(language != 'it' && language != 'es' && language != 'en') {
      language = 'it'
    }

    localStorage.setItem('lang', language);
    this.translateService.use(localStorage.getItem('lang') || 'it');

    this.activeLanguage.next(language);
  }
}
