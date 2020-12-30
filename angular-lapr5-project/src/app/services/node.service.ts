import { Injectable } from '@angular/core';
import { INode } from '../interfaces/INode';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NodeService {
  NodeURL = environment.url.mdr+'api/node';  // URL to web api
  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) { }

  getNodes(): Observable<INode[]> {
    return this.http.get<INode[]>(this.NodeURL)
    .pipe(
      catchError(this.handleError<INode[]>('getNodes', []))
    );
  }
  getNodeByKey(value:string): Observable<INode> {
    const params = new HttpParams().append('param', value);
    return this.http.get<INode>(this.NodeURL+"/findNode", {params})
    .pipe(
      catchError(this.handleError<INode>('getNodeByKey'))
    );
  }
  addNode(node: INode): Observable<INode>{
    return this.http.post<INode>(this.NodeURL, node, this.httpOptions)
    .pipe(
      catchError(this.handleError('addNode', node))
    );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
