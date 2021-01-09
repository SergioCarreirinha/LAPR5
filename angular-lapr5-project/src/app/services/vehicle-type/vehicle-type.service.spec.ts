import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpErrorHandler } from '../../http-error-handler.service';
import { IVehicleType } from '../../interfaces/IVehicleType';

import { VehicleTypeService } from './vehicle-type.service';

describe('VehicleTypeService', () => {
  let service: VehicleTypeService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        VehicleTypeService,
        HttpErrorHandler
      ]
    });
    service = TestBed.inject(VehicleTypeService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  describe('#addVehicleType', () => {
    it('should add a path and return it', () => {
      const addVehicleType: IVehicleType = {
        key: 'VehicleType:1',
        name: 'Bus',
        autonomy: 8080,
        cost: 8080,
        averageSpeed: 8080,
        energySource: 8080,
        consumption: 8080,
        emissions: 8080
      };

      service.addVehicleType(addVehicleType).subscribe(
        data => expect(data).toEqual(addVehicleType, 'should return the addVehicleType'),
        fail
      );

      // service should have made one request to POST vehicle type
      const req = httpTestingController.expectOne(service.vehicleTypeURL);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(addVehicleType);

      // Expect server to return the path after POST
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: addVehicleType });
      req.event(expectedResponse);
    });
  });
});
