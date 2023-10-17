import { TestBed } from '@angular/core/testing';

import { IframeInitializerService } from './iframe-initializer.service';

describe('IframeInitializerService', () => {
  let service: IframeInitializerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IframeInitializerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
