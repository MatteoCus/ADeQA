/* tslint:disable */
/* eslint-disable */
import { FilterOperatorsModel } from '../models/filter-operators-model';
import { OrderOperatorsModel } from '../models/order-operators-model';
export interface FetchRequestOperatorsModel {
  criteria?: Array<FilterOperatorsModel>;
  endRow?: number;
  orderby?: Array<OrderOperatorsModel>;
  startRow?: number;
}
