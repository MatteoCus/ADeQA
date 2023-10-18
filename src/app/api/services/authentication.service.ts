/* tslint:disable */
/* eslint-disable */
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { login } from '../fn/authentication/login';
import { Login$Params } from '../fn/authentication/login';
import { logout } from '../fn/authentication/logout';
import { Logout$Params } from '../fn/authentication/logout';

@Injectable({ providedIn: 'root' })
export class AuthenticationService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `login()` */
  static readonly LoginPath = '/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login$Response(params: Login$Params, context?: HttpContext): Observable<StrictHttpResponse<{
    'token'?: string;
  }>> {
    return login(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  login(params: Login$Params, context?: HttpContext): Observable<{
    'token'?: string;
  }> {
    return this.login$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
        'token'?: string;
      }>): {
        'token'?: string;
      } => r.body)
    );
  }

  /** Path part for operation `logout()` */
  static readonly LogoutPath = '/logout';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `logout()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  logout$Response(params: Logout$Params, context?: HttpContext): Observable<StrictHttpResponse<{
    'status'?: string;
  }>> {
    return logout(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `logout$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  logout(params: Logout$Params, context?: HttpContext): Observable<{
    'status'?: string;
  }> {
    return this.logout$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
        'status'?: string;
      }>): {
        'status'?: string;
      } => r.body)
    );
  }

}
