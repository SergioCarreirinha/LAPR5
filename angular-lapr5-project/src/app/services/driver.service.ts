import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IDriver } from '../interfaces/IDriver';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  private DriverURL = 'https://localhost:5001/api/driver';  // URL to web api
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  createDriver(driver: IDriver) :Observable<IDriver>{
    return this.http.post<IDriver>(this.DriverURL,driver , this.httpOptions)
    .pipe(
      catchError(this.handleError('createDriver', driver))
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
