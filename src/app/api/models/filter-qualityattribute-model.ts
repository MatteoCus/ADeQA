/* tslint:disable */
/* eslint-disable */

/**
 * Interfaccia che definisce il modello delle richieste per ottenere (filtrando) gli attributi di qualità per la fase attiva
 */
export interface FilterQualityattributeModel {
  fieldName?: 'optionvalue' | 'groupname' | 'groupdescription' | 'c_project_attribute_group_id' | 'attributeseqno' | 'attributedescription' | 'ad_reference_id' | 'm_product_category_id' | 'm_product_id' | 'attributevaluetype' | 'attributevalue' | 'attributename';
  operator?: 'iNotContains' | 'iContains' | 'greaterOrEqual' | 'lessOrEqual' | 'equals';
  value?: string;
}
