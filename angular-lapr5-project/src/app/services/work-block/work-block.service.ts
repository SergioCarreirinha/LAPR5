import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IWorkBlock } from '../../interfaces/IWorkBlock';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class WorkBlockService {
    private WorkBlockURL = environment.url.mdv + 'api/workBlock';  // URL to web api

    constructor(private http: HttpClient, private injector: Injector) { }


    getWorkBlocks(): Observable<IWorkBlock[]> {
        return this.http.get<IWorkBlock[]>(this.WorkBlockURL);
    }

    getWorkBlockById(id: string): Observable<IWorkBlock> {
        return this.http.get<IWorkBlock>(this.WorkBlockURL + '/' + id);
    }

    addWorkBlock(value: IWorkBlock): Observable<IWorkBlock> {
        return this.http.post<IWorkBlock>(this.WorkBlockURL, value);
    }
}
