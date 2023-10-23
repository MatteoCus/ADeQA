import { TestBed } from '@angular/core/testing';
import { LogoutService } from './logout.service';
import { AuthInformationsService } from '../auth-informations/auth-informations.service';
import { Router } from '@angular/router';

describe('LogoutService', () => {
  let service: LogoutService;
  let authInfoService: AuthInformationsService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LogoutService,
        {
          provide: AuthInformationsService,
          useValue: {
            clear: jasmine.createSpy('clear'),
            clearUser: jasmine.createSpy('clearUser'),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
      ],
    });
    service = TestBed.inject(LogoutService);
    authInfoService = TestBed.inject(AuthInformationsService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call AuthInformationsService.clear and navigate on logout()', () => {
    service.logout();
    expect(authInfoService.clear).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['login/username']);
  });

  it('should call AuthInformationsService.clearUser and navigate on logoutUserId()', () => {
    service.logoutUserId();
    expect(authInfoService.clearUser).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['login/pin']);
  });
});
