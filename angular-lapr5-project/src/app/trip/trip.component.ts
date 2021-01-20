import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TripService } from '../services/trip/trip.service';
import { ITrip } from '../interfaces/ITrip';
import Swal from 'sweetalert2';
import { PassingTimeService } from '../services/passing-time/passing-time.service';
import { IPassingTime } from '../interfaces/IPassingTimes';
import { LineService } from '../services/line/line.service';
import { ILine } from '../interfaces/ILine';
import { PathService } from '../services/path/path.service';
import { IPath } from '../interfaces/IPath';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {

  trips: ITrip[] = [];
  lines: ILine[] = [];


  constructor(private serviceLine: LineService, private service: TripService) { }

  ngOnInit(): void {
    this.getTrip();
    this.getLines();
  }

  private getLines() {
    this.serviceLine.getLines().subscribe(line => this.lines = line);
  }

  getTrip() {
    this.service.getTrips().subscribe(trip => this.trips = trip);
  }
}

@Component({
  selector: 'app-trip',
  templateUrl: './createTrip.component.html',
  styleUrls: ['./trip.component.css']
})
export class CreateTripComponent implements OnInit {

  trip: ITrip[] = [];
  passingTrips: any[] = [];
  passingTimes: any[] = [];
  lines: ILine[] = [];
  linePaths: IPath[] = [];

  constructor(private serviceLine: LineService, private service: TripService, private serviceP: PassingTimeService, private pathService: PathService) { }

  ngOnInit(): void {
    this.getPassingTimes();
    this.getLines();
  }

  private getLines() {
    this.serviceLine.getLines().subscribe(line => this.lines = line);
  }

  getPassingTimes() {
    this.serviceP.getPassingTimes().subscribe(passingTime => this.passingTimes = passingTime);
  }

  getPaths(){
    this.linePaths = [];
    var select = document.getElementById("selectLine");
    let linekey = (<HTMLInputElement>select).value;
    let line;
    this.lines.forEach(element => {
      if(element.key == linekey){
        line = element.name;
      }
    });
    this.pathService.getLinePaths(line).subscribe(path => this.getPathsInfo(path));
  }

  private getPathsInfo(p: any[]) {
    for (let i = 0; i < p.length; i++) {

      if (p[i].linePath != undefined) {

        for (let j = 0; j < p[i].linePath.length; j++) {
          const key = p[i].linePath[j].path;
          this.getPathByKey(key);
        }

      } else {
        this.getPathByKey(p[i].props.path)
      }
    }
  }

  private getPathByKey(key: string) {
    this.pathService.getPathByKey(key).subscribe(p => this.linePaths.push(p));
  }

  addTrip(key: string, isEmpty: string, orientation: string, line: string, path: string, isGenerated: string) {
    if (!key || !line || !path) {
      Swal.fire({
        title: 'Aviso!',
        text: "Viagem não foi criada. Parâmetros inválidos.",
        icon: 'warning',
        confirmButtonText: 'Ok',
        timer: 3000,
        showConfirmButton: false,
      })

    } else {
      let passingTripId: String[] = [];

      for (let passingTrip of this.passingTrips) {
        passingTripId.push(passingTrip.id);
      }
      if(orientation == 'adhoc'){
        //Create a Go Trip
        this.service.addTrip({key: key,
          isEmpty: isEmpty,
          orientation: "Go",
          line: line,
          path: path,
          isGenerated: isGenerated,
          passingTimes: passingTripId,} as ITrip).subscribe();
        
        //Create a Return Trip
        this.service.addTrip({
          key: key+'_Return',
          isEmpty: isEmpty,
          orientation: "Return",
          line: line,
          path: path,
          isGenerated: isGenerated,
          passingTimes: passingTripId,} as ITrip).subscribe(res => {
            Swal.fire({
              title: 'Sucesso!',
              text: 'Viagem criada',
              icon: 'success',
              confirmButtonText: 'Ok',
              timer: 3000,
              showConfirmButton: false,
            })
          },err => {
            console.log(err);
            if(err.status==400){
              Swal.fire({
                title: 'Error!',
                text: 'There is a Trip with that Key',
                icon: 'error',
                confirmButtonText: 'Ok',
                timer: 2500,
                showConfirmButton: false,
              })
            }
          });
      } else {
        this.service.addTrip({
          key: key,
          isEmpty: isEmpty,
          orientation: orientation,
          line: line,
          path: path,
          isGenerated: isGenerated,
          passingTimes: passingTripId,
        } as ITrip).subscribe(res => {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Viagem criada',
            icon: 'success',
            confirmButtonText: 'Ok',
            timer: 3000,
            showConfirmButton: false,
          })
        },err => {
          console.log(err);
          if(err.status==400){
            Swal.fire({
              title: 'Error!',
              text: 'There is a Trip with that Key',
              icon: 'error',
              confirmButtonText: 'Ok',
              timer: 2500,
              showConfirmButton: false,
            })
          }
        });
      }
    }
  }

  addPassingTime(id: string): void {
    if (id) {
      this.serviceP.getPassingById(id).subscribe(p => {
        this.passingTrips.push(p);
        this.validatePassingTime();
      });
    } else {
      Swal.fire({
        title: 'Warning!',
        text: "Can't add empty WorkBlock",
        icon: 'warning',
        confirmButtonText: 'Ok',
        timer: 2500,
        showConfirmButton: false,
      })
    }
  }

  validatePassingTime() {
    if (this.passingTrips.length === 1) {

      Swal.fire({
        title: 'Sucesso!',
        text: 'Passagem Adicionada ',
        icon: 'success',
        confirmButtonText: 'Ok',
        timer: 2500,
        showConfirmButton: false,
      })

    } else {
      this.passingTrips.pop();
      Swal.fire({
        title: 'Warning!',
        text: "A passagem precisa de ser valida!",
        icon: 'warning',
        confirmButtonText: 'Ok',
        timer: 2500,
        showConfirmButton: false,
      })
    }
  }
}
