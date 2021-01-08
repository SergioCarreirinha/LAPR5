import { HttpClient, HttpResponse } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HttpErrorHandler } from "../../http-error-handler.service";
import { IVehicle } from "../../interfaces/IVehicle";
import { VehicleService } from "./vehicle.service";

describe('VehicleService', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let vehicleService: VehicleService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                VehicleService,
                HttpErrorHandler
            ]
        });
        vehicleService = TestBed.inject(VehicleService);
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    describe('#addVehicle', () => {

        it('should add a vehicle and return it', () => {

            const addVehicle: IVehicle = {
                licensePlate: "1",
                vin: "1",
                vehicleType: "1",
                firstServiceDate: "1/1/2020"
            };

            vehicleService.addVehicle(addVehicle).subscribe(
                data => expect(data).toEqual(addVehicle, 'should return the vehicle'),
                fail
            );

            // pathService should have made one request to POST path
            const req = httpTestingController.expectOne(vehicleService.vehicleURL);
            expect(req.request.method).toEqual('POST');
            expect(req.request.body).toEqual(addVehicle);

            // Expect server to return the path after POST
            const expectedResponse = new HttpResponse(
                { status: 200, statusText: 'OK', body: addVehicle });
            req.event(expectedResponse);
        });

        // This service reports the error but finds a way to let the app keep going.
        it('should turn 404 error into return of the added vehicle', () => {

            const addVehicle: IVehicle = {
                licensePlate: "1",
                vin: "1",
                vehicleType: "1",
                firstServiceDate: "1/1/2020"
            };

            vehicleService.addVehicle(addVehicle).subscribe(
                data => expect(data).toEqual(undefined, 'should return the vehicle'),
                fail
            );

            const req = httpTestingController.expectOne(vehicleService.vehicleURL);

            // respond with a 404 and the error message in the body
            const msg = 'deliberate 404 error';
            req.flush(msg, { status: 404, statusText: 'Not Found' });
        });
    });

})