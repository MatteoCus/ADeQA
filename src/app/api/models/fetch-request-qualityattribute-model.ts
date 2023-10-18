/* tslint:disable */
/* eslint-disable */
import { FilterQualityattributeModel } from '../models/filter-qualityattribute-model';
import { OrderQualityattributeModel } from '../models/order-qualityattribute-model';

/**
 * Interfaccia che definisce la struttura di una richiesta per gli attributi di qualità
 */
export interface FetchRequestQualityattributeModel {

  /**
   * Criteri per i quali filtrare gli attributi
   */
  criteria?: Array<FilterQualityattributeModel>;

  /**
   * Riga finale da cui finire di visualizzare i record trovati
   */
  endRow?: number;

  /**
   * Criteri per i quali ordinare i record trovati
   */
  orderby?: Array<OrderQualityattributeModel>;

  /**
   * Riga iniziale da cui iniziare a visualizzare i record trovati
   */
  startRow?: number;
}
