/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { QualitysavelogModel } from '../../models/qualitysavelog-model';

/**
 * Interfaccia che definisce i parametri per inserire un nuovo log di qualità
 */
export interface Add$Params {
  AdesuiteToken: string;
  body: QualitysavelogModel
}

/**
 * Funzione di utilità per aggiungere un log di qualità per la fase attiva
 * @param http Servizio di utilità per eseguire chiamate HTTP
 * @param rootUrl URL di base della richiesta
 * @param params Parametri per effettuare la richiesta
 * @param context Contesto HTTP della richiesta
 * @returns Oggetto Observable contenete il body della risposta - il log inserito
 */
export function Add(http: HttpClient, rootUrl: string, params: Add$Params, context?: HttpContext): Observable<StrictHttpResponse<QualitysavelogModel>> {
  const rb = new RequestBuilder(rootUrl, Add.PATH, 'put');
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
 * Path relativo in cui trovare l'API relativa all'inserimento di un log di qualità per la fase attiva
 */
Add.PATH = '/9000004/qualitysavelog/add';
