import { TestBed } from '@angular/core/testing';

import { ActiveAttributesService } from './active-attributes.service';

describe('ActiveAttributesService', () => {
  let service: ActiveAttributesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveAttributesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
