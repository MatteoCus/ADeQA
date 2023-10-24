import { TestBed } from '@angular/core/testing';
import { AuthInformationsService } from './auth-informations.service';

describe('AuthInformationsService', () => {
  let service: AuthInformationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInformationsService],
    });
    service = TestBed.inject(AuthInformationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default values for properties', () => {
    expect(service.Token).toBe(localStorage.getItem("ADeToken") || "");
    expect(service.UserId).toBe(sessionStorage.getItem("ADeUserId") as any as number || 0);
    expect(service.UserName).toBe(sessionStorage.getItem("ADeUserName") || "");
    expect(service.UserTheme).toBe(sessionStorage.getItem("ADeUserTheme") as "DM" | "WM");
  });

  it('should set and get the token', () => {
    const token = '';
    service.Token = token;
    expect(service.Token).toBe(token);
  });

  it('should set and get the user ID', () => {
    const userId = 9000000;
    service.UserId = userId;
    expect(service.UserId).toBe(userId);
  });

  it('should set and get the user name', () => {
    const userName = 'John Doe';
    service.UserName = userName;
    expect(service.UserName).toBe(userName);
  });

  it('should set and get the user theme', () => {
    const userTheme = 'DM';
    service.UserTheme = userTheme;
    expect(service.UserTheme).toBe(userTheme);
  });

  it('should clear the token and user info', () => {
    service.Token = '';
    service.UserId = 9000000;
    service.UserName = 'John Doe';
    service.UserTheme = 'DM';

    service.clear();

    expect(service.Token).toBe('');
    expect(service.UserId).toBe(0);
    expect(service.UserName).toBe('');
    expect(service.UserTheme).toBeUndefined();
  });

  it('should clear user info', () => {
    service.UserId = 9000000;
    service.UserName = 'John Doe';
    service.UserTheme = 'DM';

    service.clearUser();

    expect(service.UserId).toBe(0);
    expect(service.UserName).toBe('');
    expect(service.UserTheme).toBeUndefined();
  });
});
