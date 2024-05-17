import { TestBed } from '@angular/core/testing';

import { ServiciospostService } from './serviciospost.service';

describe('ServiciospostService', () => {
  let service: ServiciospostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciospostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
