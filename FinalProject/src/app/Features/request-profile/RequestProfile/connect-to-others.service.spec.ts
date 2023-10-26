import { TestBed } from '@angular/core/testing';

import { ConnectToOthersService } from './connect-to-others.service';

describe('ConnectToOthersService', () => {
  let service: ConnectToOthersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConnectToOthersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
