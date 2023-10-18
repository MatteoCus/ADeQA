/* tslint:disable */
/* eslint-disable */

/**
 * Interfaccia che definisce le caratteristiche di un log di qualità
 */
export interface QualitysavelogModel {
  c_projectphase_id?: number;
  c_projectphase_quality_log_id?: number;
  isactive?: 'Y' | 'N';
  qualitystatus?: string;
  qualityvalue?: string;
}
