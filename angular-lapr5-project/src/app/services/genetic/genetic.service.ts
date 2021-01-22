import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IRequestSolution } from '../../interfaces/IRequestSolution';
import { IGetSolution } from '../../interfaces/IGetSolution';

@Injectable({
  providedIn: 'root'
})
export class GeneticService {

  getGeneticUrl = environment.url.mdv + 'api/genetic';
  postGeneticUrl = environment.url.prolog;
  constructor(private http: HttpClient) { }

  getSolutions() {
    return this.http.get<IGetSolution[]>(this.getGeneticUrl);
  }

  createSolution(data: IRequestSolution) {
    let headers = new HttpHeaders();

    headers.set("Access-Control-Allow-Origin", "*");

    let params = new HttpParams();
    params.set('nGenerations', data.nGenaration.toString());
    params.set('nPopulation', data.nPopulation.toString());
    params.set('pCrossing', data.pCrossing.toString());
    params.set('pMutation', data.pMutation.toString());
    params.set('nTarget', data.nTarget.toString());
    params.set('nStability', data.nStability.toString());

    return this.http.post(this.postGeneticUrl, null, {headers, params});
  }
}
