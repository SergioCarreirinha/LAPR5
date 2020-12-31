import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IVehicleDuty } from "../interfaces/IVehicleDuty";

@Injectable({
    providedIn: 'root'
  })

export class VehicleDutyService{

    private vehicleDutyURL = environment.url.mdv + 'api/vehicleDuty';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    getVehicleDuty(): Observable<IVehicleDuty[]> {
        return this.http.get<IVehicleDuty[]>(this.vehicleDutyURL)
        .pipe(
          catchError(this.handleError<IVehicleDuty[]>('getNodes', []))
        );
      }

    addVehicleDuty(vehicleDuty: IVehicleDuty): Observable<IVehicleDuty>{
        return this.http.post<IVehicleDuty>(this.vehicleDutyURL, vehicleDuty, this.httpOptions).pipe(
            catchError(this.handleError<IVehicleDuty>('addVehicleDuty')));
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