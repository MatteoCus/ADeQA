import { TestBed } from '@angular/core/testing';

import { MainViewCommunicationsService } from './main-view-communications.service';

describe('MainViewComunicationsService', () => {
  let service: MainViewCommunicationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainViewCommunicationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
