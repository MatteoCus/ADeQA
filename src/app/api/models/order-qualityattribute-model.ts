/* tslint:disable */
/* eslint-disable */

/**
 * Interfaccia che definisce il modello delle richieste per ordinare gli attributi di qualità
 */
export interface OrderQualityattributeModel {
  columnname?: 'optionvalue' | 'groupname' | 'groupdescription' | 'c_project_attribute_group_id' | 'attributeseqno' | 'attributedescription' | 'ad_reference_id' | 'm_product_category_id' | 'm_product_id' | 'attributevaluetype' | 'attributevalue' | 'attributename';
  direction?: 'ASC' | 'DESC';
}
