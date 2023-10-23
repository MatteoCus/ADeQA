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

  const operatorsServiceSpy = jasmine.createSpyObj('OperatorsService', ['fetch']);
  operatorsServiceSpy.fetch.and.returnValue(of({ data: [{ ad_user_id: 123, name: 'John Doe', mes_theme: 'DM' }] } as FetchResponseOperatorsModel));


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
        { provide: OperatorsService, useValue: operatorsServiceSpy },
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

    component.login();

    expect(operatorsService.fetch).toHaveBeenCalled();
    expect(authInfoService.UserId).toBe(123);
    expect(authInfoService.UserName).toBe('John Doe');
    expect(authInfoService.UserTheme).toBe('DM');
    expect(navigateSpy).toHaveBeenCalledWith(['dashboard']);
  });

  it('should handle login with invalid pin', () => {
    const openSnackBarSpy = spyOn(snackBar, 'open');
    component.form.get('pin')!.setValue(''); // Set an invalid pin

    component.login();

    expect(openSnackBarSpy).toHaveBeenCalledWith('Il pin inserito non è valido!', 'X', { panelClass: [ 'red-snackbar', 'login-snackbar' ] });
  });

  it('should handle login error', () => {
    const errorResponse = { error: { description: 'Some error description' }, status: 500 };
    spyOn(operatorsService, 'fetch').and.returnValue(throwError( () => errorResponse));
    const openSnackBarSpy = spyOn(snackBar, 'open');

    component.form.get('pin')!.setValue(12345);

    component.login();

    expect(openSnackBarSpy).toHaveBeenCalledWith('Translated Message', 'X');
    expect(openSnackBarSpy).toHaveBeenCalledWith('Translated Message', 'X');
    expect(authInfoService.Token).toBe('');
    expect(router.navigate).toHaveBeenCalledWith(['login/username']);
  });

});
