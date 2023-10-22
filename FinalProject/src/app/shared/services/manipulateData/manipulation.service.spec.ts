import { TestBed } from '@angular/core/testing';

import { ManipulationService } from './manipulation.service';

describe('ManipulationService', () => {
  let service: ManipulationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManipulationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
