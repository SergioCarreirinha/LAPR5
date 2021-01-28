import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { IPath } from '../../interfaces/IPath';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PathService {

  pathUrl = environment.url.mdr + 'api/linePaths';
  getPathURL = environment.url.mdr + 'api/paths';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getPaths(): Observable<IPath[]> {
    return this.http.get<IPath[]>(this.getPathURL).pipe(
      catchError(this.handleError<IPath[]>('getPaths', []))
    );
  }

  addPath(path: IPath): Observable<IPath> {
    return this.http.post<IPath>(this.pathUrl, path, this.httpOptions).pipe(
      catchError(this.handleError<IPath>('AddPath'))
    );
  }

  getLinePaths(line: string): Observable<IPath[]> {
    return this.http.get<IPath[]>(this.pathUrl + '?line=' + line).pipe(
      catchError(this.handleError<IPath[]>('getLinePaths', []))
    );
  }

  getPathByKey(key: string): Observable<IPath> {
    return this.http.get<IPath>(this.getPathURL + '/pathByKey?key=' + key).pipe(
      catchError(this.handleError<IPath>('getPathByKey'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
