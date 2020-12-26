import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authPath = environment.url.mdv;

  constructor(private http: HttpClient) { }

  login(data) : Observable<any> {
    return this.http.post(this.authPath+'login', data)
    .pipe(
      catchError(this.handleError('login', data))
    );
  }

  register(data) : Observable<any> {
    return this.http.post(this.authPath+'register', data)
    .pipe(
      catchError(this.handleError('register', data))
    )
  }

  saveToken(token){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
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
