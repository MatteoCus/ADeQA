import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginPinComponent } from './login-pin.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { OperatorsService } from 'src/app/api/services';
import { AuthInformationsService } from 'src/app/services/auth-informations/auth-informations.service';
import { FetchResponseOperatorsModel } from 'src/app/api/models';
import { of, throwError } from 'rxjs';

describe('LoginPinComponent', () => {
  let component: LoginPinComponent;
  let fixture: ComponentFixture<LoginPinComponent>;
  let operatorsService: OperatorsService;
  let authInfoService: AuthInformationsService;
  let snackBar: MatSnackBar;
  let router: Router;
  let httpTestingController: HttpTestingController;

  const params_success = {
    "AdesuiteToken": '',
    "body": {
      "startRow": 0,
      "criteria": [
        {
          "fieldName": 'userpin' as "userpin" | "mes_theme_display" | "mes_theme" | "note" | "name" | "ismobileuser" | "numero_matricola" | "isactive" | "foto" | "ad_user_id" | undefined,
          "value": 12345,
          "operator": 'equals' as "equals" | "iNotContains" | "iContains" | "greaterOrEqual" | "lessOrEqual" | undefined
        }
      ],
      "endRow": 1
    }
  };

  const params_fail_401 = {
    "AdesuiteToken": '',
    "body": {
      "startRow": 0,
      "criteria": [
        {
          "fieldName": 'userpin' as "userpin" | "mes_theme_display" | "mes_theme" | "note" | "name" | "ismobileuser" | "numero_matricola" | "isactive" | "foto" | "ad_user_id" | undefined,
          "value": 12346,
          "operator": 'equals' as "equals" | "iNotContains" | "iContains" | "greaterOrEqual" | "lessOrEqual" | undefined
        }
      ],
      "endRow": 1
    }
  };

  const params_fail_500 = {
    "AdesuiteToken": '',
    "body": {
      "startRow": 0,
      "criteria": [
        {
          "fieldName": 'userpin' as "userpin" | "mes_theme_display" | "mes_theme" | "note" | "name" | "ismobileuser" | "numero_matricola" | "isactive" | "foto" | "ad_user_id" | undefined,
          "value": 12347,
          "operator": 'equals' as "equals" | "iNotContains" | "iContains" | "greaterOrEqual" | "lessOrEqual" | undefined
        }
      ],
      "endRow": 1
    }
  };

  const params_fail_401_empty = {
    "AdesuiteToken": '',
    "body": {
      "startRow": 0,
      "criteria": [
        {
          "fieldName": 'userpin' as "userpin" | "mes_theme_display" | "mes_theme" | "note" | "name" | "ismobileuser" | "numero_matricola" | "isactive" | "foto" | "ad_user_id" | undefined,
          "value": 12348,
          "operator": 'equals' as "equals" | "iNotContains" | "iContains" | "greaterOrEqual" | "lessOrEqual" | undefined
        }
      ],
      "endRow": 1
    }
  };

  const params_fail_500_empty = {
    "AdesuiteToken": '',
    "body": {
      "startRow": 0,
      "criteria": [
        {
          "fieldName": 'userpin' as "userpin" | "mes_theme_display" | "mes_theme" | "note" | "name" | "ismobileuser" | "numero_matricola" | "isactive" | "foto" | "ad_user_id" | undefined,
          "value": 12349,
          "operator": 'equals' as "equals" | "iNotContains" | "iContains" | "greaterOrEqual" | "lessOrEqual" | undefined
        }
      ],
      "endRow": 1
    }
  };

  const params_fail_undefined_response = {
    "AdesuiteToken": '',
    "body": {
      "startRow": 0,
      "criteria": [
        {
          "fieldName": 'userpin' as "userpin" | "mes_theme_display" | "mes_theme" | "note" | "name" | "ismobileuser" | "numero_matricola" | "isactive" | "foto" | "ad_user_id" | undefined,
          "value": 12350,
          "operator": 'equals' as "equals" | "iNotContains" | "iContains" | "greaterOrEqual" | "lessOrEqual" | undefined
        }
      ],
      "endRow": 1
    }
  };

  const errorResponse401 = { error: { description: 'Non autorizzato!' }, status: 401 };
  const errorResponse500 = { error: { description: 'Errore server' }, status: 500 };
  const errorResponse401_empty = { error: null, status: 401 };
  const errorResponse500_empty = { error: null, status: 500 };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginPinComponent],
      imports: [
        HttpClientTestingModule,
        MatFormFieldModule,
        MatIconModule,
        FormsModule,
        ReactiveFormsModule,
        MatInputModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        FormBuilder,
        OperatorsService,
        {
          provide: AuthInformationsService,
          useValue: {
            Token: '',
            UserId: 0,
            UserName: '',
            UserTheme: undefined,
          },
        },
        {
          provide: MatSnackBar,
          useValue: {
            open: () => {},
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: () => {},
          },
        },
        MatSnackBar
      ]
    });
    fixture = TestBed.createComponent(LoginPinComponent);
    component = fixture.componentInstance;
    operatorsService = TestBed.inject(OperatorsService);
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
    expect(component.form.controls['pin']).toBeTruthy();
  });

  it('should append a number to the pin', () => {
    component.append(1);
    expect(component.form.get('pin')!.value).toBe('1');

    component.append(2);
    expect(component.form.get('pin')!.value).toBe('12');
  });

  it('should clear the pin', () => {
    component.form.get('pin')!.setValue(12345);
    component.clear();
    expect(component.form.get('pin')!.value).toBe('');
  });

  it('should remove the last digit from the pin', () => {
    component.form.get('pin')!.setValue(12345);
    component.removeLast();
    expect(component.form.get('pin')!.value).toBe('1234');
  });

  it('should perform login successfully', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.form.get('pin')!.setValue(12345);

    spyOn(operatorsService, 'fetch')
    .withArgs(params_success as any)
    .and.returnValue(of({ data: [{ ad_user_id: 9000000, name: 'John Doe', mes_theme: 'DM' }] } as FetchResponseOperatorsModel));


    component.login();

    expect(operatorsService.fetch).toHaveBeenCalled();
    expect(authInfoService.UserId).toBe(9000000);
    expect(authInfoService.UserName).toBe('John Doe');
    expect(authInfoService.UserTheme).toBe('DM');
    expect(navigateSpy).toHaveBeenCalledWith(['dashboard']);
  });

  it('should handle login with invalid pin', () => {
    const openSnackBarSpy = spyOn(snackBar, 'open');
    component.form.get('pin')!.setValue(''); // Set an invalid pin

    component.login();

    expect(openSnackBarSpy).toHaveBeenCalledWith('Il pin inserito non è valido!', 'X', { panelClass: [ 'red-snackbar' ] });
  });

  it('should handle login error - 401', () => {
    const openSnackBarSpy = spyOn(snackBar, 'open');
    const navigateSpy = spyOn(router, 'navigate');
    component.form.get('pin')!.setValue(12346);

    spyOn(operatorsService, 'fetch')
    .withArgs(params_fail_401 as any)
    .and.returnValue(throwError(() => errorResponse401));

    component.login();
    expect(openSnackBarSpy).toHaveBeenCalledWith('Errore 401 - Non autorizzato!', 'X', { panelClass: [ 'red-snackbar' ] });
    expect(authInfoService.Token).toBe('');
    expect(navigateSpy).toHaveBeenCalledWith(['login/username']);
  });

  it('should handle login error - 500', () => {
    const openSnackBarSpy = spyOn(snackBar, 'open');
    component.form.get('pin')!.setValue(12347);

    spyOn(operatorsService, 'fetch')
    .withArgs(params_fail_500 as any)
    .and.returnValue(throwError(() => errorResponse500));

    component.login();
    expect(openSnackBarSpy).toHaveBeenCalledWith('Errore 500 - Errore server', 'X', { panelClass: [ 'red-snackbar' ] });
    expect(authInfoService.Token).toBe('');
  });

  it('should handle login error - 401 empty', () => {
    const openSnackBarSpy = spyOn(snackBar, 'open');
    const navigateSpy = spyOn(router, 'navigate');
    component.form.get('pin')!.setValue(12348);

    spyOn(operatorsService, 'fetch')
    .withArgs(params_fail_401_empty as any)
    .and.returnValue(throwError(() => errorResponse401_empty));

    component.login();
    expect(openSnackBarSpy).toHaveBeenCalledWith('Errore 401 - Non autorizzato', 'X', { panelClass: [ 'red-snackbar' ] });
    expect(authInfoService.Token).toBe('');
    expect(navigateSpy).toHaveBeenCalledWith(['login/username']);
  });

  it('should handle login error - 500 empty', () => {
    const openSnackBarSpy = spyOn(snackBar, 'open');
    component.form.get('pin')!.setValue(12349);

    spyOn(operatorsService, 'fetch')
    .withArgs(params_fail_500_empty as any)
    .and.returnValue(throwError(() => errorResponse500_empty));

    component.login();
    expect(openSnackBarSpy).toHaveBeenCalledWith('Errore 500 - Errore lato server', 'X', { panelClass: [ 'red-snackbar' ] });
    expect(authInfoService.Token).toBe('');
  });

  it('should handle login error - undefined response', () => {
    const openSnackBarSpy = spyOn(snackBar, 'open');
    component.form.get('pin')!.setValue(12350);

    spyOn(operatorsService, 'fetch')
    .withArgs(params_fail_undefined_response as any)
    .and.returnValue(of({ data: [{ undefined }] } as any as FetchResponseOperatorsModel));

    component.login();
    expect(openSnackBarSpy).toHaveBeenCalledWith('Il PIN inserito non appartiene ad alcun utente', 'X', { panelClass: [ 'red-snackbar' ] });
    expect(authInfoService.Token).toBe('');
  });

});
