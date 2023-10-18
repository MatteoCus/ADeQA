/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FetchRequestOperatorsModel } from '../../models/fetch-request-operators-model';
import { FetchResponseOperatorsModel } from '../../models/fetch-response-operators-model';

/**
 * Interfaccia che definisce i parametri per il login - pin
 */
export interface Fetch$Params {
  AdesuiteToken: string;
  body: FetchRequestOperatorsModel
}

/**
 * Funzione di utilità per il login - pin
 * @param http Servizio di utilità per eseguire chiamate HTTP
 * @param rootUrl URL di base della richiesta
 * @param params Parametri per effettuare la richiesta
 * @param context Contesto HTTP della richiesta
 * @returns Oggetto Observable contenete il body della risposta
 */
export function fetch(http: HttpClient, rootUrl: string, params: Fetch$Params, context?: HttpContext): Observable<StrictHttpResponse<FetchResponseOperatorsModel>> {
  const rb = new RequestBuilder(rootUrl, fetch.PATH, 'post');
  if (params) {
    rb.header('AdesuiteToken', params.AdesuiteToken, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FetchResponseOperatorsModel>;
    })
  );
}

/**
 * Path relativo in cui trovare l'API relativa al login - pin
 */
fetch.PATH = '/9000006/operators/fetch';
