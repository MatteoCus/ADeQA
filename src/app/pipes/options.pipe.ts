import { Pipe, PipeTransform } from "@angular/core";

/**
 * Classe che gestisce il filtraggio delle opzioni
 */
@Pipe({ name: 'optionsTrim' })
export class OptionsPipe implements PipeTransform {

  /**
   * Costruttore della classe che gestisce il filtro delle opzioni
   */
  constructor() { }

  /**
   * Metodo per togliere le chiavi alle opzioni degli attributi da mostrare a video
   * @param option Opzione da modificare (a cui togliere la chiave)
   * @param key Stringa contenente la chiave identificativa del valore dell'opzione da mostrare a video
   * @returns L'opzione modificata senza la chiave
   */
  public transform(option: string, key: string): string {
    return option.replaceAll(key, "").replaceAll("-", "").trim();
  }
}