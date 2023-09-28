/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FetchRequestQualitysavelogModel } from '../../models/fetch-request-qualitysavelog-model';
import { FetchResponseQualitysavelogModel } from '../../models/fetch-response-qualitysavelog-model';

export interface Fetch_1$Params {
  AdesuiteToken: string;
      body: FetchRequestQualitysavelogModel
}

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

fetch_1.PATH = '/9000004/qualitysavelog/fetch';
