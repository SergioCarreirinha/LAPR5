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
        return this.http.get<IVehicleType[]>(this.vehicleTypeURL);
    }

    addVehicleType(value: IVehicleType): Observable<IVehicleType> {
        return this.http.post<IVehicleType>(this.vehicleTypeURL, value, this.httpOptions);
    }
}
