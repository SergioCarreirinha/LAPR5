import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IWorkBlock } from '../interfaces/IWorkBlock';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class WorkBlockService {
    private WorkBlockURL = environment.url.mdv + 'api/workBlock';  // URL to web api

    constructor(private http: HttpClient, private injector: Injector) { }


    getWorkBlocks(): Observable<IWorkBlock[]> {
        return this.http.get<IWorkBlock[]>(this.WorkBlockURL)
            .pipe(
                catchError(this.handleError<IWorkBlock[]>('getWorkBlocks', []))
            );
    }
    
    getWorkBlockById(id: string): Observable<IWorkBlock> {
        return this.http.get<IWorkBlock>(this.WorkBlockURL +'/'+ id).pipe( tap(_ => console.log('fetched WorkBlock')),
        catchError(this.handleError<IWorkBlock>('getWorkBlockById'))
        );
    }

    addWorkBlock(value: IWorkBlock): Observable<IWorkBlock> {
        return this.http.post<IWorkBlock>(this.WorkBlockURL, value).pipe(
            catchError(this.handleError('addWorkBlock', value))
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
