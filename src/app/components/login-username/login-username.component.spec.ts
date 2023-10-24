import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUsernameComponent } from './login-username.component';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/api/services';
import { AuthInformationsService } from 'src/app/services/auth-informations/auth-informations.service';
import { of, throwError } from 'rxjs';

describe('LoginUsernameComponent', () => {
  let component: LoginUsernameComponent;
  let fixture: ComponentFixture<LoginUsernameComponent>;
  let authService: AuthenticationService;
  let authInfoService: AuthInformationsService;
  let snackBar: MatSnackBar;
  let router: Router;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      declarations: [LoginUsernameComponent],
      providers: [
        FormBuilder,
        AuthenticationService,
        { provide: AuthInformationsService, useValue: {} },
        { provide: MatSnackBar, useValue: { open: () => {} } },
        { provide: Router, useValue: { navigate: () => {} } },
      ]
    });
    fixture = TestBed.createComponent(LoginUsernameComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthenticationService);
    authInfoService = TestBed.inject(AuthInformationsService);
    snackBar = TestBed.inject(MatSnackBar);
    router = TestBed.inject(Router);
    fixture.detectChanges();
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.form).toBeTruthy();
    expect(component.form.controls['username']).toBeTruthy();
    expect(component.form.controls['password']).toBeTruthy();
  });

  it('should perform login successfully', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.form.controls['username'].setValue('testUser');
    component.form.controls['password'].setValue('testPassword');

    const params = {
      "body": {
        'password': component.form.controls['password'].value,
        'username': component.form.controls['username'].value
      }
    };

    spyOn(authService, 'login')
    .withArgs(params as any)
    .and.returnValue(of({ token: 'mockToken' }));


    component.login();

    expect(authService.login).toHaveBeenCalledWith({
      body: {
        username: 'testUser',
        password: 'testPassword',
      },
    });
    expect(authInfoService.Token).toBe('mockToken');
    expect(navigateSpy).toHaveBeenCalledWith(['login/pin']);
  });

  it('should handle invalid form', () => {
    const openSnackBarSpy = spyOn(snackBar, 'open');

    component.form.controls['username'];
    component.form.controls['password'];

    component.login();

    expect(openSnackBarSpy).toHaveBeenCalledWith('Inserire tutti i dati richiesti', 'X', { panelClass: [ 'red-snackbar', 'login-snackbar' ] });
  });

  it('should perform login - undefined token', () => {
    const openSnackBarSpy = spyOn(snackBar, 'open');

    component.form.controls['username'].setValue('testUser');
    component.form.controls['password'].setValue('testPassword');

    const params = {
      "body": {
        'password': component.form.controls['password'].value,
        'username': component.form.controls['username'].value
      }
    };

    spyOn(authService, 'login')
    .withArgs(params as any)
    .and.returnValue(of({ token: undefined }));


    component.login();

    expect(authService.login).toHaveBeenCalledWith({
      body: {
        username: 'testUser',
        password: 'testPassword',
      },
    });
    expect(authInfoService.Token).toBeUndefined();
    expect(openSnackBarSpy).toHaveBeenCalledWith('Errore 500 - Token nullo', 'X', { panelClass: [ 'red-snackbar', 'login-snackbar' ] });
  });

  it('should handle error response', () => {
    const openSnackBarSpy = spyOn(snackBar, 'open');

    const errorResponse = { error: { description: 'Utente non trovato' }, status: 500 };

    component.form.controls['username'].setValue('testUser');
    component.form.controls['password'].setValue('testPassword');

    const params = {
      "body": {
        'password': component.form.controls['password'].value,
        'username': component.form.controls['username'].value
      }
    };

    spyOn(authService, 'login')
    .withArgs(params as any)
    .and.returnValue(throwError(() => errorResponse) );

    component.login();

    expect(openSnackBarSpy).toHaveBeenCalledWith('Errore 500 - Utente non trovato', 'X', { panelClass: [ 'red-snackbar', 'login-snackbar' ] });
  });

});
