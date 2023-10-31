import { TestBed } from '@angular/core/testing';

import { MainViewComunicationsService } from './main-view-communications.service';

describe('MainViewComunicationsService', () => {
  let service: MainViewComunicationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainViewComunicationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
