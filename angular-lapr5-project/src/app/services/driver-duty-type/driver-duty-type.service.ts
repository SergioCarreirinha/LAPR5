import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDriverDutyType } from 'src/app/interfaces/IDriverDutyType';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverDutyTypeService {
  driverDutyTypeURL = environment.url.mdv + 'api/driverDutyType';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getDriverDutyType(): Observable<IDriverDutyType[]> {
    return this.http.get<IDriverDutyType[]>(this.driverDutyTypeURL);
  }

  addDriverDutyType(value: IDriverDutyType): Observable<IDriverDutyType> {
    return this.http.post<IDriverDutyType>(this.driverDutyTypeURL, value);
  }
}
