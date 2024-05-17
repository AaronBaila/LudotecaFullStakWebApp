import { TestBed } from '@angular/core/testing';

import { ServiciosupdateService } from './serviciosupdate.service';

describe('ServiciosupdateService', () => {
  let service: ServiciosupdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosupdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
