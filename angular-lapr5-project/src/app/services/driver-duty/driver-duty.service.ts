import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { IDriverDuty } from 'src/app/interfaces/IDriverDuty';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverDutyService {

  private DriverDutyURL = environment.url.mdv + 'api/DriverDuties';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getDriverDuty(): Observable<IDriverDuty[]> {
    return this.http.get<IDriverDuty[]>(this.DriverDutyURL);
  }
  addDriverDuty(driverDuty: IDriverDuty): Observable<IDriverDuty> {
    return this.http.post<IDriverDuty>(this.DriverDutyURL, driverDuty, this.httpOptions);
  }
}
