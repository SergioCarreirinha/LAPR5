import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SolutionsService } from './solutions.service';

describe('SolutionsService', () => {
  let service: SolutionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SolutionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
