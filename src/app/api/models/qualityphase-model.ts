/* tslint:disable */
/* eslint-disable */

/**
 * Interfaccia che definisce le caratteristiche di una fase di qualità
 */
export interface QualityphaseModel {
  ad_client_id?: number;
  ad_org_id?: number;
  c_bpartner_id?: number;
  c_phase_id?: number;
  c_projectline_id?: number;
  c_projectphase_id?: number;
  color?: string;
  customer?: string;
  end_plan?: Date;
  isglobal?: 'Y' | 'N';
  linename?: string;
  m_product_category_id?: number;
  m_product_id?: number;
  phasename?: string;
  phasetitlehtml?: string;
  projectplan_timeline_id?: number;
  start_plan?: Date;
  status?: 'Y' | 'N';
}
