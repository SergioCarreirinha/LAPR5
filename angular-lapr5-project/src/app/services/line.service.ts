import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ILine } from '../interfaces/ILine';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LineService {
  private lineURL = environment.url.mdr+'api/line';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getLines(): Observable<ILine[]>{
    return this.http.get<ILine[]>(this.lineURL)
    .pipe(
      catchError(this.handleError<ILine[]>('getLines', []))
    );
  }

  addLine(value: ILine): Observable<ILine>{
    return this.http.post<ILine>(this.lineURL, value, this.httpOptions).pipe(
      catchError(this.handleError('addLine', value))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
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
