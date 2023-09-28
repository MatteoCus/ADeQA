/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { QualitysavelogModel } from '../../models/qualitysavelog-model';

export interface Update$Params {
  AdesuiteToken: string;
      body: QualitysavelogModel
}

export function Update(http: HttpClient, rootUrl: string, params: Update$Params, context?: HttpContext): Observable<StrictHttpResponse<QualitysavelogModel>> {
  const rb = new RequestBuilder(rootUrl, Update.PATH, 'post');
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

Update.PATH = '/9000004/qualitysavelog/update';
