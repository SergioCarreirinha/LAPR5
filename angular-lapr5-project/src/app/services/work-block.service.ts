import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IWorkBlock } from '../interfaces/IWorkBlock';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class WorkBlockService {
    private WorkBlockURL = environment.url.mdr + 'api/workBlock';  // URL to web api

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    createDriver(workBlock: IWorkBlock): Observable<IWorkBlock> {
        return this.http.post<IWorkBlock>(this.WorkBlockURL, workBlock, this.httpOptions)
            .pipe(
                catchError(this.handleError('createWorkBlock', workBlock))
            );
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
