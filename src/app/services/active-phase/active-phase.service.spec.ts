import { TestBed } from '@angular/core/testing';

import { ActivePhaseService } from './active-phase.service';

describe('ActivePhaseService', () => {
  let service: ActivePhaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivePhaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
