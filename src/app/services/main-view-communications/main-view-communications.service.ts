import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { QualitysavelogModel } from 'src/app/api/models';

/**
 * Servizio che mette in comunicazione LogModifierComponent e LogViewerComponent
 */
@Injectable({
  providedIn: 'root'
})
export class MainViewCommunicationsService {

  /**
   * Oggetto osservabile che funge da tramite per il passaggio del log da modificare tra LogViewerComponent e LogModifierComponent
   */
  public updateLog: Subject<QualitysavelogModel> = new Subject<QualitysavelogModel>();

  /**
   * Oggetto osservabile che indica a LogViewerComponent di fare un refresh della tabella dei log attivi
   */
  public viewUpdate: Subject<QualitysavelogModel> = new Subject<QualitysavelogModel>();

  /**
   * Costruttore di default
   */
  constructor() { }
}
