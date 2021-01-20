import { Injectable } from '@angular/core';
import { INode } from '../../interfaces/INode';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  NodeURL = environment.url.mdr + 'api/node';  // URL to web api


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  getNodes(): Observable<INode[]> {
    return this.http.get<INode[]>(this.NodeURL);
  }
  getNodeByKey(value: string): Observable<INode> {
    const params = new HttpParams().append('param', value);
    return this.http.get<INode>(this.NodeURL + "/findNode", { params });
  }
  addNode(node: INode): Observable<INode> {
    return this.http.post<INode>(this.NodeURL, node, this.httpOptions);
  }
}
