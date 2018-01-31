import { TestBed, inject } from '@angular/core/testing';

import { CupcakeModalService } from './cupcake-modal.service';

describe('CupcakeModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CupcakeModalService]
    });
  });

  it('should be created', inject([CupcakeModalService], (service: CupcakeModalService) => {
    expect(service).toBeTruthy();
  }));
});
