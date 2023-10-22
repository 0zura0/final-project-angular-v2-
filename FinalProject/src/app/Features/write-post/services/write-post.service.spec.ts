import { TestBed } from '@angular/core/testing';

import { WritePostService } from './write-post.service';

describe('WritePostService', () => {
  let service: WritePostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WritePostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
