/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface Logout$Params {
      body: any
}

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

logout.PATH = '/logout';
