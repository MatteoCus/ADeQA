/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FetchRequestOperatorsModel } from '../../models/fetch-request-operators-model';
import { FetchResponseOperatorsModel } from '../../models/fetch-response-operators-model';

export interface Fetch$Params {
  AdesuiteToken: string;
      body: FetchRequestOperatorsModel
}

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

fetch.PATH = '/9000006/operators/fetch';
