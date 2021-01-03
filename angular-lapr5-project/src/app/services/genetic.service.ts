import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IRequestSolution } from '../interfaces/IRequestSolution';
import { IGetSolution } from '../interfaces/IGetSolution';

@Injectable({
  providedIn: 'root'
})
export class GeneticService {

  getGeneticUrl = environment.url.mdr + 'api/genetic';
  /* postGeneticUrl = environment.url.planning; */
  constructor(private http: HttpClient) {}

  getSolutions(){
    return this.http.get<IGetSolution[]>(this.getGeneticUrl)
      .pipe(
        catchError(this.handleError<IGetSolution[]>('getSolution', []))
      );
  }

  createSolution(data: IRequestSolution){
    return null; /* this.http.post<IRequestSolution>(this.postGeneticUrl, data).pipe(
      catchError(this.handleError<IRequestSolution>('createSolution'))); */
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
