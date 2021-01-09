import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ILine } from '../interfaces/ILine';
import { LineService } from '../services/line/line.service';
import Swal from 'sweetalert2';

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




  goBack(): void {
    this.location.back();
  }
}

@Component({
  selector: 'app-createLine',
  templateUrl: './createLine.component.html',
  styleUrls: ['./line.component.css']
})
export class CreateLineComponent implements OnInit {

  lines: ILine[] = [];

  constructor(private lineService: LineService) { }

  ngOnInit(): void {
    this.getLines();
  }

  getLines() {
    this.lineService.getLines().subscribe(line => this.lines = line);
  }

  addLine(key: string, name: string, color: string) {
    if (key != '' && name != '' && color != '') {
      this.lineService.addLine({ key: key, name: name, color: color, linePaths: [], allowedDrivers: [], allowedVehicles: [] } as ILine).subscribe()
      Swal.fire({
        title: 'Success!',
        text: 'Line Created',
        icon: 'success',
        confirmButtonText: 'Ok',
        timer: 3000,
        showConfirmButton: false,
      })
    } else {
      Swal.fire({
        title: 'Warning!',
        text: "Line couldn't be created. Invalid parameters.",
        icon: 'warning',
        confirmButtonText: 'Ok',
        timer: 3000,
        showConfirmButton: false,
      })
    }

  }

}