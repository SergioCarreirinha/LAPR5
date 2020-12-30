import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { VehicleDutyService } from './vehicle-duty.service';

describe('VehicleDutyService', () => {
    let service: VehicleDutyService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(VehicleDutyService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
