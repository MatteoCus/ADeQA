/* tslint:disable */
/* eslint-disable */
import { FilterQualityphaseModel } from '../models/filter-qualityphase-model';
import { OrderQualityphaseModel } from '../models/order-qualityphase-model';
export interface FetchRequestQualityphaseModel {
  criteria?: Array<FilterQualityphaseModel>;
  endRow?: number;
  orderby?: Array<OrderQualityphaseModel>;
  startRow?: number;
}
