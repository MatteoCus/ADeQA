import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { QualityphaseModel } from 'src/app/api/models';

/**
 * Classe che gestisce la fase attualmente selezionata
 * Serve per notificare il component di visualizzazione degli attributi
 */
@Injectable({
  providedIn: 'root'
})
export class ActivePhaseService {

  /**
   * Attributo che contiene un Subject della fase attiva
   */
  private activePhase : Subject<QualityphaseModel> = new Subject<QualityphaseModel>();

  /**
   * Ultima fase selezionata, serve per evitare di fare il fetch di attributi se si prova a selezionare la fase già selezionata
   */
  private lastValue: QualityphaseModel = new Object();

  /**
   * Costruttore della classe che gestisce la fase attiva
   */
  constructor() { }

  /**
   * Metodo per aggiornare la fase attualmente selezionata
   * @param phase Nuova fase selezionata
   */
  public update(phase: QualityphaseModel): void {
    if(phase != this.lastValue) {
      this.activePhase.next(phase);
      this.lastValue = phase;
    }
  }

  /**
   * Metodo per ottenere un oggetto osservabile della fase attiva
   * @returns Oggetto osservabile, serve per eseguire codice al cambiamento della fase attiva
   */
  public getActivePhase(): Observable<QualityphaseModel> {
    return this.activePhase;
  }
}
