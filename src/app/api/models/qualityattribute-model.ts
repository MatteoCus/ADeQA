/* tslint:disable */
/* eslint-disable */

/**
 * Interfaccia che definisce le caratteristiche dei valori delle opzioni di un attributo di qualità
 */
export interface JsonList {
  key: string[],
  value: string[]
}

/**
 * Interfaccia che definisce le caratteristiche delle opzioni di un attributo di qualità
 */
export interface optionType {
  type: string,
  value: JsonList
}

/**
 * Interfaccia che definisce le caratteristiche di un attributo di qualità
 */
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
