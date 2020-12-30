import { HttpClient, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpErrorHandler } from '../http-error-handler.service';
import { INode } from '../interfaces/INode';

import { NodeService } from './node.service';

describe('NodeService', () => {
  let service: NodeService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
          NodeService,
          HttpErrorHandler
      ]
    });
    service = TestBed.inject(NodeService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#addNode', () => {

    it('should add a Driver and return it', () => {

        const addNode: INode = {
          key: "string",
          name: "string",
          latitude:1232,
          longitude: 1232,
          shortName: "string",
          isDepot: "true",
          isReliefPoint: "false",
          capacities: 30
        };

        service.addNode(addNode).subscribe(
            data => expect(data).toEqual(addNode, 'should return the Node'),
            fail
        );

        // pathService should have made one request to POST path
        const req = httpTestingController.expectOne(service.NodeURL);
        expect(req.request.method).toEqual('POST');
        expect(req.request.body).toEqual(addNode);

        // Expect server to return the path after POST
        const expectedResponse = new HttpResponse(
            { status: 200, statusText: 'OK', body: addNode });
        req.event(expectedResponse);
      });
    });
      describe('#getNodes', () => {
        let iNodes: INode[];
    
        beforeEach(() => {
          service = TestBed.inject(NodeService);
          iNodes = [
            { key: "string",
            name: "string",
            latitude:1232,
            longitude: 1232,
            shortName: "string",
            isDepot: "true",
            isReliefPoint: "false",
            capacities: 30
          },
          { key: "string1",
          name: "string1",
          latitude:12321,
          longitude: 12321,
          shortName: "string1",
          isDepot: "true",
          isReliefPoint: "false",
          capacities: 301
          },
          ] as INode[];
        });

      it('should return expected nodes', () => {
        service.getNodes().subscribe(nodes => expect(nodes).toEqual(iNodes,'should return expected nodes'), fail);
  
        const req = httpTestingController.expectOne(service.NodeURL);
        expect(req.request.method).toEqual('GET');
  
        req.flush(iNodes);
      });
    });
})