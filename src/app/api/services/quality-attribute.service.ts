/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { fetch_3 } from '../fn/quality-attribute/fetch-3';
import { Fetch_3$Params } from '../fn/quality-attribute/fetch-3';
import { FetchResponseQualityattributeModel } from '../models/fetch-response-qualityattribute-model';


/**
 * Visualizza gli attributi disponibile per prodotto o categoria prodotto
 */
@Injectable({ providedIn: 'root' })
export class QualityAttributeService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `fetch_3()` */
  static readonly Fetch_3Path = '/9000003/qualityattribute/fetch';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fetch_3()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  fetch_3$Response(params: Fetch_3$Params, context?: HttpContext): Observable<StrictHttpResponse<FetchResponseQualityattributeModel>> {
    return fetch_3(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fetch_3$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  fetch_3(params: Fetch_3$Params, context?: HttpContext): Observable<FetchResponseQualityattributeModel> {
    return this.fetch_3$Response(params, context).pipe(
      map((r: StrictHttpResponse<FetchResponseQualityattributeModel>): FetchResponseQualityattributeModel => r.body)
    );
  }

}
