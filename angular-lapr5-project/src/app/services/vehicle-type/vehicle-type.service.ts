import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IVehicleType } from '../../interfaces/IVehicleType';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class VehicleTypeService {
    vehicleTypeURL = environment.url.mdr + 'api/vehicleType';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    getVehicleTypes(): Observable<IVehicleType[]> {
        return this.http.get<IVehicleType[]>(this.vehicleTypeURL)
            .pipe(
                catchError(this.handleError<IVehicleType[]>('getDriverTypes', []))
            );
    }

    addVehicleType(value: IVehicleType): Observable<IVehicleType> {
        return this.http.post<IVehicleType>(this.vehicleTypeURL, value, this.httpOptions).pipe(
            catchError(this.handleError('addVehicleType', value))
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
