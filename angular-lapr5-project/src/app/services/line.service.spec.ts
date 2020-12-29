import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { LineService } from './line.service';

describe('LineService', () => {
  let service: LineService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
