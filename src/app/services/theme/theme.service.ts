import { Injectable } from '@angular/core';
import { currentTheme, refreshTheme } from 'devextreme/viz/themes';

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
      currentTheme('material.dark-theme');
      refreshTheme();
    } else {
      document.body.classList.remove('theme-dark');
      document.body.classList.add('theme-light');
      currentTheme('material.light-theme');
      refreshTheme();
    }
  }

  applyThemeColorVariables(styleSheet: CSSStyleSheet){
    for (let i=0; i<styleSheet.cssRules.length;i++){
        let cssRule = styleSheet.cssRules.item(i) as CSSStyleRule
        if (cssRule?.selectorText === ".dx-theme-accent-as-text-color") {
            document.documentElement.style.setProperty('--base-accent',cssRule.style.color)
        }
    }
}

  applyBaseTheme(theme?: string) {
    for(let index in document.styleSheets) {
        let styleSheet = document.styleSheets[index], href = styleSheet.href;

        console.log(href);
        if(href) {
            let themeMarkerPosition = href.indexOf("dx.");
            if(themeMarkerPosition >= 0) {
                let startPosition = themeMarkerPosition + "dx.".length,
                    endPosition = href.indexOf(".css"),
                    fileNamePart = href.substring(startPosition, endPosition);
                console.log(fileNamePart);
                console.log(theme);

                if (fileNamePart === theme) {
                  console.log(styleSheet);
                    this.applyThemeColorVariables(styleSheet)
                    styleSheet.disabled = false
                } else {
                    styleSheet.disabled = true
                }                   
            }
        }
    }
}
}
