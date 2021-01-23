import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDriver } from '../../interfaces/IDriver';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  DriverURL = environment.url.mdv + 'api/driver';  // URL to web api

  constructor(private http: HttpClient, private injector: Injector) { }

  createDriver(driver: IDriver): Observable<IDriver> {
    return this.http.post<IDriver>(this.DriverURL, driver);
  }
  
  getAllDrivers(){
    return this.http.get<IDriver>(this.DriverURL);
  }
}
