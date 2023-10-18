/* tslint:disable */
/* eslint-disable */
import { QualitysavelogModel } from '../models/qualitysavelog-model';

/**
 * Interfaccia che definisce la struttura di una risposta per una richiesta di log di qualità
 */
export interface FetchResponseQualitysavelogModel {

  /**
   * Dati in risposta: array di log di qualità
   */
  data?: Array<QualitysavelogModel>;

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
