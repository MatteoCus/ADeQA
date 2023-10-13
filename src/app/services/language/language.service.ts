import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

/**
 * Classe di gestione del linguaggio attivo
 */
@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  /**
   * Flusso che emette il linguaggio attivo durante l'esecuzione 
   */
  public activeLanguage: Subject<string> = new Subject<string>();

  /**
   * Costruttore della classe di gestione del linguaggio attivo
   * @param translateService Servizio di gestione delle traduzioni: si basa su file json definiti in /assets/
   */
  constructor(private translateService: TranslateService) {}

  /**
   * Metodo per cambiare il linguaggio attivo
   * @param language Linguaggio da impostare come attivo
   */
  public changeLanguage(language: string): void {

    if(language != 'it' && language != 'es' && language != 'en') {
      language = 'it'
    }

    localStorage.setItem('lang', language);
    this.translateService.use(localStorage.getItem('lang') || 'it');

    this.activeLanguage.next(language);
  }
}
