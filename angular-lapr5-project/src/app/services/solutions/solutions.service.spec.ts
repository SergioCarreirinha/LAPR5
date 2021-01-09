import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpErrorHandler } from '../../http-error-handler.service';
import { ISolutions } from '../../interfaces/ISolutions';

import { SolutionsService } from './solutions.service';

describe('SolutionsService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: SolutionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SolutionsService,
        HttpErrorHandler
      ]
    });
    service = TestBed.inject(SolutionsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#getPaths', () => {
    let expectedSolutions: ISolutions[];

    beforeEach(() => {
      service = TestBed.inject(SolutionsService);
      expectedSolutions = [
        {
          source: 'path:1',
          destination: 'false',
          path: ['Amen'],
          startTime: '0',
          arriveTime: '0'
        },
        {
          source: 'path:2',
          destination: 'false',
          path: ['Amen'],
          startTime: '0',
          arriveTime: '0'
        },
      ] as ISolutions[];
    });

    it('should return expected paths', () => {
      service.getSolutions().subscribe(solutions => expect(solutions).toEqual(expectedSolutions, 'should return expected solutions'), fail);

      const req = httpTestingController.expectOne(service.getPathURL);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedSolutions);
    });
  });
});
