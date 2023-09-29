import { TestBed } from '@angular/core/testing';

import { AuthInformationsService } from './auth-informations.service';

describe('AuthInformationsService', () => {
  let service: AuthInformationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthInformationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
