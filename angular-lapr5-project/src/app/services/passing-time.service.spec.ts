import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpErrorHandler } from '../http-error-handler.service';
import { IPassingTime } from '../interfaces/IPassingTimes';

import { PassingTimeService } from './passing-time.service';

describe('PassingTimeService', () => {
  let service: PassingTimeService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        PassingTimeService,
        HttpErrorHandler
      ]
    });
    service = TestBed.inject(PassingTimeService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#addPassingTime', () => {

    it('should add a Passing Time and return it', () => {

        const addPassingTime: IPassingTime = {
          key: "string",
          time: "string",
          node: "string",
          isUsed: true,
          isReliefPoint: false
        };

        service.addPassingTime(addPassingTime).subscribe(
            data => expect(data).toEqual(addPassingTime, 'should return the Passing Time'),
            fail
        );

        // pathService should have made one request to POST path
        const req = httpTestingController.expectOne(service.passingTimesURL);
        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(addPassingTime);

        // Expect server to return the path after POST
        const expectedResponse = new HttpResponse(
            { status: 200, statusText: 'OK', body: addPassingTime });
        req.event(expectedResponse);
      });
    });
      describe('#getNodes', () => {
        let iPassingTimes: IPassingTime[];
    
        beforeEach(() => {
          service = TestBed.inject(PassingTimeService);
          iPassingTimes = [
            { key: "string",
            time: "string",
            node: "string",
            isUsed: true,
            isReliefPoint: false
          },
          { key: "string2",
          time: "string2",
          node: "string2",
          isUsed: true,
          isReliefPoint: true
          },
          ] as IPassingTime[];
        });

      it('should return expected nodes', () => {
        service.getPassingTimes().subscribe(times => expect(times).toEqual(iPassingTimes,'should return expected nodes'), fail);
  
        const req = httpTestingController.expectOne(service.passingTimesURL);
        expect(req.request.method).toEqual('GET');
  
        req.flush(iPassingTimes);
      });
    });
});
