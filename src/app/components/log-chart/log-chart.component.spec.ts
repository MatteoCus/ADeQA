import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogChartComponent } from './log-chart.component';

describe('LogChartComponent', () => {
  let component: LogChartComponent;
  let fixture: ComponentFixture<LogChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LogChartComponent]
    });
    fixture = TestBed.createComponent(LogChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
