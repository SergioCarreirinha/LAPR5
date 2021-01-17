import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImportService {

  private importURL = environment.url.mdr+'api/fileUpload';  // URL to web api
  private importURLMDV = environment.url.mdv+'api/fileUpload';

  constructor(private http: HttpClient) { }

  importFile(event: any){
    const formData=new FormData();
    formData.append('xml', event.files[0]);
    return this.http.post(this.importURL, formData).pipe(
      catchError(this.handleError('importFile', formData))
    );
  }

  importFileMDV(event: any){
    const formData=new FormData();
    formData.append('file', event.files[0]);
    return this.http.post(this.importURLMDV, formData).pipe(
      catchError(this.handleError('importFileMDV', formData))
    );
    
  }

   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
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
