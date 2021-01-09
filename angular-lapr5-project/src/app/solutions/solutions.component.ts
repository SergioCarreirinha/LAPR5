import { Component, OnInit } from '@angular/core';
import { ISolutions } from '../interfaces/ISolutions';
import { SolutionsService } from '../services/solutions/solutions.service';

@Component({
  selector: 'app-solutions',
  templateUrl: './solutions.component.html',
  styleUrls: ['./solutions.component.css']
})
export class SolutionsComponent implements OnInit {

  solutions: ISolutions[] = [];

  constructor(private service: SolutionsService) { }

  ngOnInit(): void {
    this.getSolutions();
  }

  getSolutions() {
    this.service.getSolutions().subscribe(solution => this.solutions = solution);
  }

}
