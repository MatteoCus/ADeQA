/* tslint:disable */
/* eslint-disable */
import { FilterQualitysavelogModel } from '../models/filter-qualitysavelog-model';
import { OrderQualitysavelogModel } from '../models/order-qualitysavelog-model';

/**
 * Interfaccia che definisce la struttura di una richiesta per i log di qualità
 */
export interface FetchRequestQualitysavelogModel {

  /**
   * Criteri per i quali filtrare i log di qualità
   */
  criteria?: Array<FilterQualitysavelogModel>;

  /**
   * Riga finale da cui finire di visualizzare i record trovati
   */
  endRow?: number;

  /**
   * Criteri per i quali ordinare i record trovati
   */
  orderby?: Array<OrderQualitysavelogModel>;

  /**
   * Riga iniziale da cui iniziare a visualizzare i record trovati
   */
  startRow?: number;
}
