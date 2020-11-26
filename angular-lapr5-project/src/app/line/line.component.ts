import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ILine } from '../interfaces/ILine';
import { LineService } from '../services/line.service';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {

  lines: ILine[] = [];

  constructor(private service: LineService, private location: Location) { }

  ngOnInit(): void {
    this.getLines();
  }

  getLines() {
    this.service.getLines().subscribe(line => this.lines = line);
  }

  addLine(key: string, name: string, color: string){
    this.service.addLine({key: key, name: name, color: color, linePaths: [], allowedDrivers: [], allowedVehicles: []} as ILine).subscribe(line => this.lines.push(line))
  }

  goBack(): void {
    this.location.back();
  }
}
