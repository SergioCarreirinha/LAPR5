import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { IVehicle } from "../interfaces/IVehicle";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: 'root'
  })

export class VehicleService{

    vehicleURL = environment.url.mdv + 'api/vehicle';

    constructor(private http: HttpClient, private injector: Injector) {}

    addVehicle(vehicle: IVehicle): Observable<IVehicle>{
        return this.http.post<IVehicle>(this.vehicleURL, vehicle).pipe(
            tap((newPath: IVehicle) => console.log(`Vehicle with VIN=${newPath.vin} added`)),
            catchError(this.handleError<IVehicle>('addVehicle')));
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