/* tslint:disable */
/* eslint-disable */

/**
 * Interfaccia che definisce il modello delle richieste per ottenere (filtrando) gli operatori
 */
export interface FilterOperatorsModel {
  fieldName?: 'mes_theme_display' | 'mes_theme' | 'note' | 'name' | 'ismobileuser' | 'numero_matricola' | 'isactive' | 'userpin' | 'foto' | 'ad_user_id';
  operator?: 'iNotContains' | 'iContains' | 'greaterOrEqual' | 'lessOrEqual' | 'equals';
  value?: string;
}
