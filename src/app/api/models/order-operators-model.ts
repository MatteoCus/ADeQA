/* tslint:disable */
/* eslint-disable */

/**
 * Interfaccia che definisce il modello delle richieste per ordinare gli operatori
 */
export interface OrderOperatorsModel {
  columnname?: 'mes_theme' | 'note' | 'name' | 'ismobileuser' | 'numero_matricola' | 'isactive' | 'userpin' | 'foto' | 'ad_user_id';
  direction?: 'ASC' | 'DESC';
}
