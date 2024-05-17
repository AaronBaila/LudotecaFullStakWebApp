import { TestBed } from '@angular/core/testing';

import { ServiciosauthService } from './serviciosauth.service';

describe('ServiciosauthService', () => {
  let service: ServiciosauthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosauthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
