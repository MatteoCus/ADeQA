/* tslint:disable */
/* eslint-disable */
import { FilterQualitysavelogModel } from '../models/filter-qualitysavelog-model';
import { OrderQualitysavelogModel } from '../models/order-qualitysavelog-model';
export interface FetchRequestQualitysavelogModel {
  criteria?: Array<FilterQualitysavelogModel>;
  endRow?: number;
  orderby?: Array<OrderQualitysavelogModel>;
  startRow?: number;
}
