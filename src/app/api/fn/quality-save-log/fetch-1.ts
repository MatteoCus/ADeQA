/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FetchRequestQualitysavelogModel } from '../../models/fetch-request-qualitysavelog-model';
import { FetchResponseQualitysavelogModel } from '../../models/fetch-response-qualitysavelog-model';

/**
 * Interfaccia che definisce i parametri per ottenere i log di qualità
 */
export interface Fetch_1$Params {
  AdesuiteToken: string;
  body: FetchRequestQualitysavelogModel
}

/**
 * Funzione di utilità per ottenere un log di qualità
 * @param http Servizio di utilità per eseguire chiamate HTTP
 * @param rootUrl URL di base della richiesta
 * @param params Parametri per effettuare la richiesta
 * @param context Contesto HTTP della richiesta
 * @returns Oggetto Observable contenete il body della risposta - i log di qualità
 */
export function fetch_1(http: HttpClient, rootUrl: string, params: Fetch_1$Params, context?: HttpContext): Observable<StrictHttpResponse<FetchResponseQualitysavelogModel>> {
  const rb = new RequestBuilder(rootUrl, fetch_1.PATH, 'post');
  if (params) {
    rb.header('AdesuiteToken', params.AdesuiteToken, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FetchResponseQualitysavelogModel>;
    })
  );
}

/**
 * Path relativo in cui trovare l'API relativa all'ottenimento dei log di qualità
 */
fetch_1.PATH = '/9000004/qualitysavelog/fetch';
