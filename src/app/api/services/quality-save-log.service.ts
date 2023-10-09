/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { Add } from '../fn/quality-save-log/9000004-add';
import { Add$Params } from '../fn/quality-save-log/9000004-add';
import { Delete } from '../fn/quality-save-log/9000004-delete';
import { Delete$Params } from '../fn/quality-save-log/9000004-delete';
import { Update } from '../fn/quality-save-log/9000004-update';
import { Update$Params } from '../fn/quality-save-log/9000004-update';
import { fetch_1 } from '../fn/quality-save-log/fetch-1';
import { Fetch_1$Params } from '../fn/quality-save-log/fetch-1';
import { FetchResponseQualitysavelogModel } from '../models/fetch-response-qualitysavelog-model';
import { QualitysavelogModel } from '../models/qualitysavelog-model';


/**
 * Servizi che permettono il salvataggio dei log
 */
@Injectable({ providedIn: 'root' })
export class QualitySaveLogService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `Add()` */
  static readonly AddPath = '/9000004/qualitysavelog/add';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `Add()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  Add$Response(params: Add$Params, context?: HttpContext): Observable<StrictHttpResponse<QualitysavelogModel>> {
    return Add(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `Add$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  Add(params: Add$Params, context?: HttpContext): Observable<QualitysavelogModel> {
    return this.Add$Response(params, context).pipe(
      map((r: StrictHttpResponse<QualitysavelogModel>): QualitysavelogModel => r.body)
    );
  }

  /** Path part for operation `Delete()` */
  static readonly DeletePath = '/9000004/qualitysavelog/remove';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `Delete()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  Delete$Response(params: Delete$Params, context?: HttpContext): Observable<StrictHttpResponse<QualitysavelogModel>> {
    return Delete(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `Delete$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  Delete(params: Delete$Params, context?: HttpContext): Observable<QualitysavelogModel> {
    return this.Delete$Response(params, context).pipe(
      map((r: StrictHttpResponse<QualitysavelogModel>): QualitysavelogModel => r.body)
    );
  }

  /** Path part for operation `fetch_1()` */
  static readonly Fetch_1Path = '/9000004/qualitysavelog/fetch';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `fetch_1()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  fetch_1$Response(params: Fetch_1$Params, context?: HttpContext): Observable<StrictHttpResponse<FetchResponseQualitysavelogModel>> {
    return fetch_1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `fetch_1$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  fetch_1(params: Fetch_1$Params, context?: HttpContext): Observable<FetchResponseQualitysavelogModel> {
    return this.fetch_1$Response(params, context).pipe(
      map((r: StrictHttpResponse<FetchResponseQualitysavelogModel>): FetchResponseQualitysavelogModel => r.body)
    );
  }

  /** Path part for operation `Update()` */
  static readonly UpdatePath = '/9000004/qualitysavelog/update';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `Update()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  Update$Response(params: Update$Params, context?: HttpContext): Observable<StrictHttpResponse<QualitysavelogModel>> {
    return Update(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `Update$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  Update(params: Update$Params, context?: HttpContext): Observable<QualitysavelogModel> {
    return this.Update$Response(params, context).pipe(
      map((r: StrictHttpResponse<QualitysavelogModel>): QualitysavelogModel => r.body)
    );
  }

}
