import { TestBed } from '@angular/core/testing';

import { ServiciosgetService } from './serviciosget.service';

describe('ServiciosgetService', () => {
  let service: ServiciosgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosgetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
