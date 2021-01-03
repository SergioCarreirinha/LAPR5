import { Component, OnInit } from '@angular/core';
import { IGetSolution } from '../interfaces/IGetSolution';
import { IRequestSolution } from '../interfaces/IRequestSolution';
import { GeneticService } from '../services/genetic.service'

@Component({
  selector: 'app-planning-sprint-c',
  templateUrl: './planning-sprint-c.component.html',
  styleUrls: ['./planning-sprint-c.component.css']
})
export class PlanningSprintCComponent implements OnInit {


  solutions : IGetSolution[] = [];

  constructor(private service: GeneticService) { }

  ngOnInit(): void {
    this.getSolutions();
  }

  getSolutions(){
    this.service.getSolutions().subscribe(data => this.solutions = data);
  }

  createSolution(genaration: number, population: number, crossing: number, mutation: number, target: number, stability: number){
    this.service.createSolution({
      nGenaration: genaration,
      nPopulation: population,
      pCrossing: crossing,
      pMutation: mutation,
      nTarget: target,
      nStability: stability
    } as IRequestSolution).subscribe();
  }

}
