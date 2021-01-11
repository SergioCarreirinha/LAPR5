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
    return this.http.post<ITrip>(this.tripURL, trip);
  }

  getTrips(): Observable<ITrip[]> {
    return this.http.get<ITrip[]>(this.tripURL);
  }

  getTripById(id: string): Observable<ITrip> {
    return this.http.get<ITrip>(this.tripURL + '/' + id);
  }
}
