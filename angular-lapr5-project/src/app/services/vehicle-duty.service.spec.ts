import { TestBed } from '@angular/core/testing';

import { VehicleDutyService } from './vehicle-duty.service';

describe('VehicleTypeService', () => {
    let service: VehicleDutyService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(VehicleDutyService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
