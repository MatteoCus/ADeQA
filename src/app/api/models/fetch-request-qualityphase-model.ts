/* tslint:disable */
/* eslint-disable */
import { FilterQualityphaseModel } from '../models/filter-qualityphase-model';
import { OrderQualityphaseModel } from '../models/order-qualityphase-model';

/**
 * Interfaccia che definisce la struttura di una richiesta per le fasi di qualità
 */
export interface FetchRequestQualityphaseModel {

  /**
   * Criteri per i quali filtrare le fasi
   */
  criteria?: Array<FilterQualityphaseModel>;

  /**
   * Riga finale da cui finire di visualizzare i record trovati
   */
  endRow?: number;

  /**
   * Criteri per i quali ordinare i record trovati
   */
  orderby?: Array<OrderQualityphaseModel>;

  /**
   * Riga iniziale da cui iniziare a visualizzare i record trovati
   */
  startRow?: number;
}
