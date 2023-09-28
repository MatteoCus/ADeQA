/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { FetchRequestQualityphaseModel } from '../../models/fetch-request-qualityphase-model';
import { FetchResponseQualityphaseModel } from '../../models/fetch-response-qualityphase-model';

export interface Fetch_2$Params {
  AdesuiteToken: string;
      body: FetchRequestQualityphaseModel
}

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

fetch_2.PATH = '/9000005/qualityphase/fetch';
