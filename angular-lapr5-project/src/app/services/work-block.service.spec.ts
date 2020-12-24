import { TestBed } from '@angular/core/testing';

import { WorkBlockService } from './work-block.service';

describe('WorkBlockService', () => {
    let service: WorkBlockService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(WorkBlockService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
