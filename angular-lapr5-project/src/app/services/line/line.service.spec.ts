import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpErrorHandler } from '../../http-error-handler.service';
import { ILine } from '../../interfaces/ILine';

import { LineService } from './line.service';

describe('LineService', () => {
  let service: LineService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LineService,
        HttpErrorHandler
      ]
    });
    service = TestBed.inject(LineService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#getLines', () => {
    let expectedLines: ILine[];

    beforeEach(() => {
      service = TestBed.inject(LineService);
      expectedLines = [
        {
          key: 'Line:1',
          name: 'A',
          color: 'RGB(255,255,255)',
          linePaths: [],
          allowedDrivers: [],
          allowedVehicles: []
        },
        {
          key: 'Line:2',
          name: 'B',
          color: 'RGB(255,255,255)',
          linePaths: [],
          allowedDrivers: [],
          allowedVehicles: []
        },
      ] as ILine[];
    });

    it('should return expected lines', () => {
      service.getLines().subscribe(lines => expect(lines).toEqual(expectedLines, 'should return expected lines'), fail);

      const req = httpTestingController.expectOne(service.lineURL);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedLines);
    });

    it('should be OK returning no lines', () => {

      service.getLines().subscribe(
        paths => expect(paths.length).toEqual(0, 'should have empty lines array'),
        fail
      );

      const req = httpTestingController.expectOne(service.lineURL);
      req.flush([]); // Respond with no lines
    })

    it('should turn 404 into an empty lines result', () => {

      service.getLines().subscribe(
        paths => expect(paths.length).toEqual(0, 'should return empty lines array'),
        fail
      );

      const req = httpTestingController.expectOne(service.lineURL);

      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error';
      req.flush(msg, { status: 404, statusText: 'Not Found' });
    });

    it('should return expected lines (called multiple times)', () => {

      service.getLines().subscribe();
      service.getLines().subscribe();
      service.getLines().subscribe(
        paths => expect(paths).toEqual(expectedLines, 'should return expected lines'),
        fail
      );

      const requests = httpTestingController.match(service.lineURL);
      expect(requests.length).toEqual(3, 'calls to getPaths()');

      // Respond to each request with different mock line results
      requests[0].flush([]);
      requests[1].flush([{
        key: 'Line',
        name: 'B',
        color: 'RGB(255,255,255)',
        linePaths: [],
        allowedDrivers: [],
        allowedVehicles: []
      }]);
      requests[2].flush(expectedLines);
    });
  })

  describe('#addLine', () => {

    it('should add a line and return it', () => {

      const addLine: ILine = {
        key: 'Line:3',
        name: 'C',
        color: 'RGB(211,235,215)',
        linePaths: [],
        allowedDrivers: [],
        allowedVehicles: []
      };

      service.addLine(addLine).subscribe(
        data => expect(data).toEqual(addLine, 'should return the line'),
        fail
      );

      // service should have made one request to POST line
      const req = httpTestingController.expectOne(service.lineURL);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(addLine);

      // Expect server to return the line after POST
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: addLine });
      req.event(expectedResponse);
    });
  });
});
