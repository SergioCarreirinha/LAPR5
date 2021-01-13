import { TestBed } from '@angular/core/testing';

import { DriverDutyService } from './driver-duty.service';

describe('DriverDutyService', () => {
  let service: DriverDutyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverDutyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
