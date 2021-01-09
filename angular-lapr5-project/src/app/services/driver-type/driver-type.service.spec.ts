import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpErrorHandler } from '../../http-error-handler.service';
import { IDriverType } from '../../interfaces/IDriverType';

import { DriverTypeService } from './driver-type.service';

describe('DriverTypeService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: DriverTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DriverTypeService,
        HttpErrorHandler
      ]
    });
    service = TestBed.inject(DriverTypeService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('add driver type', () => {
    it('should add a driver type and return it', () => {

      const addDriverType: IDriverType = {
        description: 'Motorista'
      };

      service.addDriverType(addDriverType).subscribe(
        data => expect(data).toEqual(addDriverType, 'should return the driver type'),
        fail
      );

      // service should have made one request to POST path
      const req = httpTestingController.expectOne(service.driverTypeURL);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(addDriverType);

      // Expect server to return the driver type after POST
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: addDriverType });
      req.event(expectedResponse);
    });
  });
});
