import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IDriverType } from '../../interfaces/IDriverType';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverTypeService {
  driverTypeURL = environment.url.mdr + 'api/driverType';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getDriverTypes(): Observable<IDriverType[]> {
    return this.http.get<IDriverType[]>(this.driverTypeURL);
  }

  addDriverType(value: IDriverType): Observable<IDriverType> {
    return this.http.post<IDriverType>(this.driverTypeURL, value, this.httpOptions);
  }
}
