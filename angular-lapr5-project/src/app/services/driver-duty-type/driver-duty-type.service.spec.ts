import { TestBed } from '@angular/core/testing';

import { DriverDutyTypeService } from './driver-duty-type.service';

describe('DriverDutyTypeService', () => {
  let service: DriverDutyTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DriverDutyTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
