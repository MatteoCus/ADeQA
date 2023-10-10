import { Pipe, PipeTransform, SecurityContext } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

/**
 * Classe che gestisce la sanificazione di input HTML
 */
@Pipe({name: 'safeHtml'})
export class SafePipe implements PipeTransform {

  /**
   * Costruttore della classe che gestisce la sanificazione di input HTML
   * @param sanitizer Oggetto che sanifica gli input
   */
  constructor(private sanitizer: DomSanitizer){}

  /**
   * Metodo per sanificare una stringa contenente HTML
   * @param style Stringa da sanificare
   * @returns La stringa sanificata (un oggetto nullo in caso di errori)
   */
  public transform(style: string): string | null {
    return this.sanitizer.sanitize(SecurityContext.HTML, style);
  }
}