import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ITrip } from '../../interfaces/ITrip';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private tripURL = environment.url.mdv + 'api/trip';  // URL to web api


  constructor(private http: HttpClient, private injector: Injector) { }

  addTrip(trip: ITrip): Observable<ITrip> {
    return this.http.post<ITrip>(this.tripURL, trip).pipe(
      catchError(this.handleError<ITrip>('addTrip')));
  }

  getTrips(): Observable<ITrip[]> {
    return this.http.get<ITrip[]>(this.tripURL)
      .pipe(
        catchError(this.handleError<ITrip[]>('getTrips', []))
      );
  }

  getTripById(id: string): Observable<ITrip> {
    return this.http.get<ITrip>(this.tripURL + '/' + id).pipe(tap(_ => console.log('fetched Trip')),
      catchError(this.handleError<ITrip>('getTripById'))
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
