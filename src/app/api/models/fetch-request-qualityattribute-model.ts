/* tslint:disable */
/* eslint-disable */
import { FilterQualityattributeModel } from '../models/filter-qualityattribute-model';
import { OrderQualityattributeModel } from '../models/order-qualityattribute-model';
export interface FetchRequestQualityattributeModel {
  criteria?: Array<FilterQualityattributeModel>;
  endRow?: number;
  orderby?: Array<OrderQualityattributeModel>;
  startRow?: number;
}
