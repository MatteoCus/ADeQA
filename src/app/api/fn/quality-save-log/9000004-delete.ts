/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { QualitysavelogModel } from '../../models/qualitysavelog-model';

/**
 * Interfaccia che definisce i parametri per eliminare un log di qualità
 */
export interface Delete$Params {
  AdesuiteToken: string;
      body: {
'c_projectphase_id'?: number;
}
}

/**
 * Funzione di utilità per eliminare un log di qualità
 * @param http Servizio di utilità per eseguire chiamate HTTP
 * @param rootUrl URL di base della richiesta
 * @param params Parametri per effettuare la richiesta
 * @param context Contesto HTTP della richiesta
 * @returns Oggetto Observable contenete il body della risposta - il log eliminato
 */
export function Delete(http: HttpClient, rootUrl: string, params: Delete$Params, context?: HttpContext): Observable<StrictHttpResponse<QualitysavelogModel>> {
  const rb = new RequestBuilder(rootUrl, Delete.PATH, 'delete');
  if (params) {
    rb.header('AdesuiteToken', params.AdesuiteToken, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<QualitysavelogModel>;
    })
  );
}

/**
 * Path relativo in cui trovare l'API relativa all'eliminazione di un log di qualità
 */
Delete.PATH = '/9000004/qualitysavelog/remove';
