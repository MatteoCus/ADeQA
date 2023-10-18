/* tslint:disable */
/* eslint-disable */

/**
 * Interfaccia che definisce il modello delle richieste per ordinare i log di qualità
 */
export interface OrderQualitysavelogModel {
  columnname?: 'qualitystatus' | 'qualityvalue' | 'isactive' | 'c_projectphase_quality_log_id' | 'c_projectphase_id';
  direction?: 'ASC' | 'DESC';
}
