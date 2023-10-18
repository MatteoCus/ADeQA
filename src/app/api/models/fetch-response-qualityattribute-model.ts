/* tslint:disable */
/* eslint-disable */
import { QualityattributeModel } from '../models/qualityattribute-model';

/**
 * Interfaccia che definisce la struttura di una risposta per una richiesta di attributi di qualità
 */
export interface FetchResponseQualityattributeModel {

  /**
   * Dati in risposta: array di attributi di qualità
   */
  data?: Array<QualityattributeModel>;

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
