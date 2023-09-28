/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { fetch_2 } from '../fn/quality-phase/fetch-2';
import { Fetch_2$Params } from '../fn/quality-phase/fetch-2';
import { FetchResponseQualityphaseModel } from '../models/fetch-response-qualityphase-model';


/**
 * Lista delle fasi di cui eseguire i controlli
 */
@Injectable({ providedIn: 'root' })
export class QualityPhaseService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `fetch_2()` */
  static readonly Fetch_2Path = '/9000005/qualityphase/fetch';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fetch_2()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  fetch_2$Response(params: Fetch_2$Params, context?: HttpContext): Observable<StrictHttpResponse<FetchResponseQualityphaseModel>> {
    return fetch_2(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fetch_2$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  fetch_2(params: Fetch_2$Params, context?: HttpContext): Observable<FetchResponseQualityphaseModel> {
    return this.fetch_2$Response(params, context).pipe(
      map((r: StrictHttpResponse<FetchResponseQualityphaseModel>): FetchResponseQualityphaseModel => r.body)
    );
  }

}
