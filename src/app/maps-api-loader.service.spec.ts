import { TestBed, inject } from '@angular/core/testing';

import { MapsApiLoaderService } from './maps-api-loader.service';

describe('MapsApiLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapsApiLoaderService]
    });
  });

  it('should be created', inject([MapsApiLoaderService], (service: MapsApiLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
