import { TestBed } from '@angular/core/testing';

import { PassingTimeService } from './passing-time.service';

describe('PassingTimeService', () => {
  let service: PassingTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PassingTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
