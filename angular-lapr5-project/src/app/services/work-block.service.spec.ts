import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { WorkBlockService } from './work-block.service';

describe('WorkBlockService', () => {
    let service: WorkBlockService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(WorkBlockService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
