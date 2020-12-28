import { HttpClient, HttpResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { PathService } from './path.service';
import { HttpErrorHandler } from '../http-error-handler.service';
import { IPath } from '../interfaces/IPath';

describe('PathService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let pathService: PathService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers : [
        PathService,
        HttpErrorHandler
      ]
    });
    pathService = TestBed.inject(PathService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
        httpTestingController.verify();
  });

  describe('#getPaths', () => {
    let expectedPaths: IPath[];

    beforeEach(() => {
      pathService = TestBed.inject(PathService);
      expectedPaths = [
        { key: 'path:1',
          isEmpty: false,
          pathNodes: [],
          totalDur: 0,
          totalDist: 0
      },
      { key: 'path:2',
          isEmpty: false,
          pathNodes: [],
          totalDur: 2,
          totalDist: 2
      },
      ] as IPath[];
    });

    it('should return expected paths', () => {
      pathService.getPaths().subscribe(paths => expect(paths).toEqual(expectedPaths,'should return expected paths'), fail);

      const req = httpTestingController.expectOne(pathService.getPathURL);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedPaths);
    });

    it('should be OK returning no paths', () => {

      pathService.getPaths().subscribe(
        paths => expect(paths.length).toEqual(0, 'should have empty paths array'),
        fail
      );

      const req = httpTestingController.expectOne(pathService.getPathURL);
      req.flush([]); // Respond with no paths
    })

    it('should turn 404 into an empty paths result', () => {

      pathService.getPaths().subscribe(
        paths => expect(paths.length).toEqual(0, 'should return empty paths array'),
        fail
      );

      const req = httpTestingController.expectOne(pathService.getPathURL);

      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error';
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

    it('should return expected paths (called multiple times)', () => {

      pathService.getPaths().subscribe();
      pathService.getPaths().subscribe();
      pathService.getPaths().subscribe(
        paths => expect(paths).toEqual(expectedPaths, 'should return expected paths'),
        fail
      );

      const requests = httpTestingController.match(pathService.getPathURL);
      expect(requests.length).toEqual(3, 'calls to getPaths()');

      // Respond to each request with different mock path results
      requests[0].flush([]);
      requests[1].flush([{ key: 'path',
      isEmpty: false,
      pathNodes: [],
      totalDur: 0,
      totalDist: 0
  }]);
      requests[2].flush(expectedPaths);
    });
  })

  describe('#addPath', () => {

    it('should add a path and return it', () => {

      const addPath: IPath = { 
        line: '1',
        key : '1',
        toGo : false,
        isEmpty : false,
        pathNodes : [],
        totalDur : 0,
        totalDist : 0 };

      pathService.addPath(addPath).subscribe(
        data => expect(data).toEqual(addPath, 'should return the path'),
        fail
      );

      // pathService should have made one request to POST path
      const req = httpTestingController.expectOne(pathService.pathUrl);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(addPath);

      // Expect server to return the path after POST
      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: addPath });
      req.event(expectedResponse);
    });

    // This service reports the error but finds a way to let the app keep going.
    it('should turn 404 error into return of the added path', () => {
      
      const addPath: IPath = { 
        line: '1',
        key : '1',
        toGo : false,
        isEmpty : false,
        pathNodes : [],
        totalDur : 0,
        totalDist : 0 };

        pathService.addPath(addPath).subscribe(
          data => expect(data).toEqual(undefined, 'should return the path'),
          fail
        );

      const req = httpTestingController.expectOne(pathService.pathUrl);

      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error';
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });
  });

  describe('#getLinePaths', () => {
    let expectedLinePaths: IPath[];

    beforeEach(() => {
      pathService = TestBed.inject(PathService);
      expectedLinePaths = [
        { key: 'path:1',
          isEmpty: false,
          pathNodes: [],
          totalDur: 0,
          totalDist: 0
      },
      { key: 'path:2',
          isEmpty: false,
          pathNodes: [],
          totalDur: 2,
          totalDist: 2
      },
      ] as IPath[];
    });

    it('should return expected linePaths', () => {
      let line = "1";
      pathService.getLinePaths(line).subscribe(paths => expect(paths).toEqual(expectedLinePaths,'should return expected paths'), fail);

      const req = httpTestingController.expectOne(pathService.pathUrl+ '?line='+ line);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedLinePaths);
    });

    it('should be OK returning no paths', () => {
      let line = "1";
      pathService.getLinePaths(line).subscribe(
        paths => expect(paths.length).toEqual(0, 'should have empty paths array'),
        fail
      );

      const req = httpTestingController.expectOne(pathService.pathUrl+ '?line='+ line);
      req.flush([]); // Respond with no paths
    })

    it('should turn 404 into an empty linePaths result', () => {
      let line = "1";
      pathService.getLinePaths(line).subscribe(
        paths => expect(paths.length).toEqual(0, 'should return empty paths array'),
        fail
      );

      const req = httpTestingController.expectOne(pathService.pathUrl+ '?line='+ line);

      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error';
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

    it('should return expected paths (called multiple times)', () => {
      let line ="1";
      pathService.getLinePaths(line).subscribe();
      pathService.getLinePaths(line).subscribe();
      pathService.getLinePaths(line).subscribe(
        paths => expect(paths).toEqual(expectedLinePaths, 'should return expected paths'),
        fail
      );

      const requests = httpTestingController.match(pathService.pathUrl+ '?line='+ line);
      expect(requests.length).toEqual(3, 'calls to getPaths()');

      // Respond to each request with different mock path results
      requests[0].flush([]);
      requests[1].flush([{ key: 'path',
      isEmpty: false,
      pathNodes: [],
      totalDur: 0,
      totalDist: 0
  }]);
      requests[2].flush(expectedLinePaths);
    });
  })

  describe('#getPathByKey', () => {
    let expectedPath: IPath;
    let pathKey = "path:1";

    beforeEach(() => {
      pathService = TestBed.inject(PathService);
      expectedPath =
        { key: 'path:1',
          isEmpty: false,
          pathNodes: [],
          totalDur: 0,
          totalDist: 0
      } as IPath;
    });

    it('should return expected path', () => {
      pathService.getPathByKey(pathKey).subscribe(path => expect(path).toEqual(expectedPath,'should return expecte path'), fail);

      const req = httpTestingController.expectOne(pathService.getPathURL + '/pathByKey?key='+ pathKey);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedPath);
    });

    it('should be OK returning no path', () => {
      pathService.getPathByKey(pathKey).subscribe(
        path => expect(path).toEqual(null, 'should have no path'),
        fail
      );

      const req = httpTestingController.expectOne(pathService.getPathURL + '/pathByKey?key='+ pathKey);
      req.flush(null); // Respond with no path
    })

    it('should turn 404 into an empty path result', () => {
      pathService.getPathByKey(pathKey).subscribe(
        path => expect(path).toEqual(undefined, 'should return empty paths array'),
        fail
      );

      const req = httpTestingController.expectOne(pathService.getPathURL + '/pathByKey?key='+ pathKey);

      // respond with a 404 and the error message in the body
      const msg = 'deliberate 404 error';
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

    it('should return expected paths (called multiple times)', () => {
      pathService.getPathByKey(pathKey).subscribe();
      pathService.getPathByKey(pathKey).subscribe();
      pathService.getPathByKey(pathKey).subscribe(
        paths => expect(paths).toEqual(expectedPath, 'should return expected path'),
        fail
      );

      const requests = httpTestingController.match(pathService.getPathURL + '/pathByKey?key='+ pathKey);
      expect(requests.length).toEqual(3, 'calls to getPaths()');

      // Respond to each request with different mock path results
      requests[0].flush(null);
      requests[1].flush({ key: 'path',
      isEmpty: false,
      pathNodes: [],
      totalDur: 0,
      totalDist: 0
  });
      requests[2].flush(expectedPath);
    }); 
  })

  });
