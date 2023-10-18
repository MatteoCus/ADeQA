/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FetchRequestQualityphaseModel } from '../../models/fetch-request-qualityphase-model';
import { FetchResponseQualityphaseModel } from '../../models/fetch-response-qualityphase-model';

/**
 * Interfaccia che definisce i parametri per ottenere le fasi di produzione
 */
export interface Fetch_2$Params {
  AdesuiteToken: string;
      body: FetchRequestQualityphaseModel
}

/**
 * Funzione di utilità per ottenere una fase di produzione
 * @param http Servizio di utilità per eseguire chiamate HTTP
 * @param rootUrl URL di base della richiesta
 * @param params Parametri per effettuare la richiesta
 * @param context Contesto HTTP della richiesta
 * @returns Oggetto Observable contenete il body della risposta - le fasi di produzione
 */
export function fetch_2(http: HttpClient, rootUrl: string, params: Fetch_2$Params, context?: HttpContext): Observable<StrictHttpResponse<FetchResponseQualityphaseModel>> {
  const rb = new RequestBuilder(rootUrl, fetch_2.PATH, 'post');
  if (params) {
    rb.header('AdesuiteToken', params.AdesuiteToken, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FetchResponseQualityphaseModel>;
    })
  );
}

/**
 * Path relativo in cui trovare l'API relativa all'ottenimento delle fasi di produzione
 */
fetch_2.PATH = '/9000005/qualityphase/fetch';
