import { TestBed, inject } from '@angular/core/testing';

import { WorkordersService } from './workorders.service';

describe('WorkordersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkordersService]
    });
  });

  it('should be created', inject([WorkordersService], (service: WorkordersService) => {
    expect(service).toBeTruthy();
  }));
});
