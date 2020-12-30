import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpErrorHandler } from '../http-error-handler.service';
import { IDriver } from '../interfaces/IDriver';

import { DriverService } from './driver.service';

describe('DriverService', () => {
  let service: DriverService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
          DriverService,
          HttpErrorHandler
      ]
    });
    service = TestBed.inject(DriverService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#addDriver', () => {

    it('should add a Driver and return it', () => {

        const addDriver: IDriver = {
          name: "n1",
          birthdate: "2020-12-30",
          driverLicenseNum: 12345,
          licenseExpiration: "2020-12-30"
        };

        service.createDriver(addDriver).subscribe(
            data => expect(data).toEqual(addDriver, 'should return the Driver'),
            fail
        );

        // pathService should have made one request to POST path
        const req = httpTestingController.expectOne(service.DriverURL);
        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(addDriver);

        // Expect server to return the path after POST
        const expectedResponse = new HttpResponse(
            { status: 200, statusText: 'OK', body: addDriver });
        req.event(expectedResponse);
      });
    });
})
