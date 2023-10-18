/* tslint:disable */
/* eslint-disable */

/**
 * Interfaccia che definisce il modello delle richieste per ottenere (filtrando) i log di qualità
 */
export interface FilterQualitysavelogModel {
  fieldName?: 'qualitystatus' | 'qualityvalue' | 'isactive' | 'c_projectphase_quality_log_id' | 'c_projectphase_id';
  operator?: 'iNotContains' | 'iContains' | 'greaterOrEqual' | 'lessOrEqual' | 'equals';
  value?: string;
}
