/* tslint:disable */
/* eslint-disable */
import { FilterOperatorsModel } from '../models/filter-operators-model';
import { OrderOperatorsModel } from '../models/order-operators-model';

/**
 * Interfaccia che definisce la struttura di una richiesta per gli operatori (login - pin)
 */
export interface FetchRequestOperatorsModel {
  /**
   * Criteri per i quali filtrare gli operatori
   */
  criteria?: Array<FilterOperatorsModel>;

  /**
   * Riga finale da cui finire di visualizzare i record trovati
   */
  endRow?: number;

  /**
   * Criteri per i quali ordinare i record trovati
   */
  orderby?: Array<OrderOperatorsModel>;

  /**
   * Riga iniziale da cui iniziare a visualizzare i record trovati
   */
  startRow?: number;
}
