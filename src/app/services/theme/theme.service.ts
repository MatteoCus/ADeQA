import { Injectable } from '@angular/core';

/**
 * Servizio che consente la gestione del tema grafico dell'applicazione
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  /**
   * Costruttore di default
   */
  constructor() { }

  /**
   * Metodo per impostare il tema grafico dell'applicazione 
   * @param dark Variabile booleana che indica se il tema è chiaro (false) o scuro (true)
   */
  public toggleTheme(dark: boolean) {

    if (dark) {
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
    }
  }
}
