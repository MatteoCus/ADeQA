import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginUsernameComponent } from './login-username.component';

describe('LoginUsernameComponent', () => {
  let component: LoginUsernameComponent;
  let fixture: ComponentFixture<LoginUsernameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginUsernameComponent]
    });
    fixture = TestBed.createComponent(LoginUsernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
