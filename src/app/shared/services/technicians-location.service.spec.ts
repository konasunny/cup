import { TestBed, inject } from '@angular/core/testing';

import { TechniciansLocationService } from './technicians-location.service';

describe('TechniciansLocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TechniciansLocationService]
    });
  });

  it('should be created', inject([TechniciansLocationService], (service: TechniciansLocationService) => {
    expect(service).toBeTruthy();
  }));
});
