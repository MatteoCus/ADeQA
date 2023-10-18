/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { fetch } from '../fn/operators/fetch';
import { Fetch$Params } from '../fn/operators/fetch';
import { FetchResponseOperatorsModel } from '../models/fetch-response-operators-model';

@Injectable({ providedIn: 'root' })
export class OperatorsService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `fetch()` */
  static readonly FetchPath = '/9000006/operators/fetch';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fetch()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  fetch$Response(params: Fetch$Params, context?: HttpContext): Observable<StrictHttpResponse<FetchResponseOperatorsModel>> {
    return fetch(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fetch$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  fetch(params: Fetch$Params, context?: HttpContext): Observable<FetchResponseOperatorsModel> {
    return this.fetch$Response(params, context).pipe(
      map((r: StrictHttpResponse<FetchResponseOperatorsModel>): FetchResponseOperatorsModel => r.body)
    );
  }

}
