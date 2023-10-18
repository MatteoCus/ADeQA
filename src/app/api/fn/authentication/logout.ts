/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

/**
 * Interfaccia che definisce i parametri per il logout
 */
export interface Logout$Params {
  body: any
}

/**
 * Funzione di utilità per il logout
 * @param http Servizio di utilità per eseguire chiamate HTTP
 * @param rootUrl URL di base della richiesta
 * @param params Parametri per effettuare la richiesta
 * @param context Contesto HTTP della richiesta
 * @returns Oggetto Observable contenete il body della risposta
 */
export function logout(http: HttpClient, rootUrl: string, params: Logout$Params, context?: HttpContext): Observable<StrictHttpResponse<{
  'status'?: string;
}>> {
  const rb = new RequestBuilder(rootUrl, logout.PATH, 'post');
  if (params) {
    rb.body(params.body, 'application/json');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
        'status'?: string;
      }>;
    })
  );
}

/**
 * Path relativo in cui trovare l'API relativa al logout
 */
logout.PATH = '/logout';
