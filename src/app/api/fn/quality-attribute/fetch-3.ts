/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FetchRequestQualityattributeModel } from '../../models/fetch-request-qualityattribute-model';
import { FetchResponseQualityattributeModel } from '../../models/fetch-response-qualityattribute-model';

/**
 * Interfaccia che definisce i parametri per ottenere gli attributi di qualità di una fase
 */
export interface Fetch_3$Params {
  AdesuiteToken: string;
  body: FetchRequestQualityattributeModel
}

/**
 * Funzione di utilità per ottenere gli attributi di qualità di una fase
 * @param http Servizio di utilità per eseguire chiamate HTTP
 * @param rootUrl URL di base della richiesta
 * @param params Parametri per effettuare la richiesta
 * @param context Contesto HTTP della richiesta
 * @returns Oggetto Observable contenete il body della risposta - gli attributi di qualità di una fase
 */
export function fetch_3(http: HttpClient, rootUrl: string, params: Fetch_3$Params, context?: HttpContext): Observable<StrictHttpResponse<FetchResponseQualityattributeModel>> {
  const rb = new RequestBuilder(rootUrl, fetch_3.PATH, 'post');
  if (params) {
    rb.header('AdesuiteToken', params.AdesuiteToken, {});
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<FetchResponseQualityattributeModel>;
    })
  );
}

/**
 * Path relativo in cui trovare l'API relativa all'ottenimento degli attributi di qualità di una fase
 */
fetch_3.PATH = '/9000003/qualityattribute/fetch';
