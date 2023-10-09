/* tslint:disable */
/* eslint-disable */

export interface JsonList {
  key: string[],
  value: string[]
}

export interface optionType {
  type: string,
  value: JsonList
}

export interface QualityattributeModel {
  ad_reference_id?: number;
  attributedescription?: string;
  attributename?: string;
  attributeseqno?: number;
  attributevalue?: string;
  attributevaluetype?: 'Y' | 'N' | 'S' | 'L';
  c_project_attribute_group_id?: number;
  groupdescription?: string;
  groupname?: string;
  m_product_category_id?: number;
  m_product_id?: number;
  optionvalue?: optionType;
}
