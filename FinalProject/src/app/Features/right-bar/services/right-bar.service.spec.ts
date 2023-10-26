import { TestBed } from '@angular/core/testing';

import { RightBarService } from './right-bar.service';

describe('RightBarService', () => {
  let service: RightBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RightBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
