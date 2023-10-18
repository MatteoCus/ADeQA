/* tslint:disable */
/* eslint-disable */
import { QualityphaseModel } from '../models/qualityphase-model';

/**
 * Interfaccia che definisce la struttura di una risposta per una richiesta di fasi di qualità
 */
export interface FetchResponseQualityphaseModel {

  /**
   * Dati in risposta: array di fasi di qualità
   */
  data?: Array<QualityphaseModel>;

  /**
   * Riga finale da cui si visualizzano i record trovati
   */
  endRow?: number;

  /**
   * Riga iniziale da cui si visualizzano i record trovati
   */
  startRow?: number;

  /**
   * Numero totale di righe trovate
   */
  totalRows?: number;
}
