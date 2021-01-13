import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IPassingTime } from '../../interfaces/IPassingTimes';

@Injectable({
  providedIn: 'root'
})
export class PassingTimeService {

  constructor(private http: HttpClient) { }

  passingTimesURL = environment.url.mdv + 'api/passingTime';

  getPassingTimes(): Observable<IPassingTime[]> {
    return this.http.get<IPassingTime[]>(this.passingTimesURL);
  }

  getPassingById(id: string): Observable<IPassingTime> {
    return this.http.get<IPassingTime>(this.passingTimesURL + '/' + id);
  }

  addPassingTime(value: IPassingTime): Observable<IPassingTime> {
    return this.http.post<IPassingTime>(this.passingTimesURL, value);
  }

}
