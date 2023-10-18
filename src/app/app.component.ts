import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /**
   * Costruttore della classe di entry point
   * @param translate Servizio di traduzione di ngx-translate
   */
  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('it');
    this.translateService.use(localStorage.getItem('lang') || 'it');
  }
}
