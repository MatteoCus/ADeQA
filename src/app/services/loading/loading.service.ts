import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Servizio per gestire la schermata di caricamento dopo il login
 */
@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  /**
   * Attributo osservabile che emette "false" quando il caricamento termina
   */
  private loading: Subject<boolean> = new Subject<boolean>();

  /**
   * Attributo che indica se il caricamento del LogModifierComponent è avvenuto
   */
  private logModifierLoading: boolean = true;

  /**
   * Attributo che indica se il caricamento del LogViewerComponent è avvenuto
   */
  private logViewerLoading: boolean = true;

  /**
   * Costruttore del servizio
   */
  constructor() { }

  /**
   * Getter del flusso di notifica dei caricamenti
   */
  public get Loading() {
    return this.loading;
  }

  /**
   * Metodo per indicare che LogModifierComponent ha terminato il caricamento
   */
  public stopModifierLoading(): void {
    this.logModifierLoading = false;

    if (this.logModifierLoading == this.logViewerLoading) {
      this.loading.next(false);
    }
  }

  /**
   * Metodo per indicare che LogViewerComponent ha terminato il caricamento
   */
  public stopViewerLoading(): void {
    this.logViewerLoading = false;

    if (this.logModifierLoading == this.logViewerLoading) {
      this.loading.next(false);
    }
  }

  /**
   * Metodo per riportare allo stato iniziale il servizio
   */
  public reset(): void {
    this.logModifierLoading = true;
    this.logViewerLoading = true;
  }
}
