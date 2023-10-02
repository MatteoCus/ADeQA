import { Injectable } from '@angular/core';

/**
 * Servizio che consente la gestione del tema grafico dell'applicazione
 */
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  /**
   * Variabile booleana che indica se il tema è chiaro (false) o scuro (true)
   */
  public isDark: boolean = false;

  /**
   * Costruttore di default
   */
  constructor() { }

  /**
   * Metodo per impostare il tema grafico dell'applicazione 
   * @param dark Variabile booleana che indica se il tema è chiaro (false) o scuro (true)
   */
  public toggleTheme(dark: boolean) {
    this.isDark = dark;

    if(this.isDark){
      document.body.classList.remove('theme-light');
      document.body.classList.add('theme-dark');
    } else {
      document.body.classList.add('theme-light');
      document.body.classList.remove('theme-dark');
    }

    localStorage.setItem("ADeTheme", dark? "dark": "light");
  }
}
