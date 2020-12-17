import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IDriverType } from '../interfaces/IDriverType';

@Injectable({
  providedIn: 'root'
})
export class DriverTypeService {
  private driverTypeURL = 'https://mdr25.azurewebsites.net/api/driverType';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getDriverTypes(): Observable<IDriverType[]> {
    return this.http.get<IDriverType[]>(this.driverTypeURL)
      .pipe(
        catchError(this.handleError<IDriverType[]>('getDriverTypes', []))
      );
  }

  addDriverType(value: IDriverType): Observable<IDriverType> {
    return this.http.post<IDriverType>(this.driverTypeURL, value, this.httpOptions).pipe(
      catchError(this.handleError('addDriverType', value))
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
