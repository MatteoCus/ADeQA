/* tslint:disable */
/* eslint-disable */
import { OperatorsModel } from '../models/operators-model';

/**
 * Interfaccia che definisce la struttura di una risposta per una richiesta di operatori
 */
export interface FetchResponseOperatorsModel {

  /**
   * Dati in risposta: array di operatori
   */
  data?: Array<OperatorsModel>;

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
