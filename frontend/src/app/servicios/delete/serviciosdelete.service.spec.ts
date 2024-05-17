import { TestBed } from '@angular/core/testing';

import { ServiciosdeleteService } from './serviciosdelete.service';

describe('ServiciosdeleteService', () => {
  let service: ServiciosdeleteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosdeleteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
