import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogModifierComponent } from './log-modifier.component';

describe('LogModifierComponent', () => {
  let component: LogModifierComponent;
  let fixture: ComponentFixture<LogModifierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogModifierComponent]
    });
    fixture = TestBed.createComponent(LogModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
