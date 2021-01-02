import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPassingTime } from '../interfaces/IPassingTimes';

@Injectable({
  providedIn: 'root'
})
export class PassingTimeService {

  constructor(private http: HttpClient) { }

  passingTimesURL = environment.url.mdv+'api/passingTime';

  getPassingTimes(): Observable<IPassingTime[]>{
    return this.http.get<IPassingTime[]>(this.passingTimesURL)
    .pipe(
      catchError(this.handleError<IPassingTime[]>('getPassingTimes', []))
    );
  }

  getPassingById(id: string): Observable<IPassingTime>{
    return this.http.get<IPassingTime>(this.passingTimesURL+'/'+id)
    .pipe(
      catchError(this.handleError<IPassingTime>('getPassingById'))
    );
  }

  addPassingTime(value: IPassingTime): Observable<IPassingTime>{
    return this.http.post<IPassingTime>(this.passingTimesURL, value).pipe(
      catchError(this.handleError('addPassingTime', value))
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
