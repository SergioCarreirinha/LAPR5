import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TripService } from '../services/trip.service';
import { ITrip } from '../interfaces/ITrip';
import Swal from 'sweetalert2';
import { PassingTimeService } from '../services/passing-time.service';
import { IPassingTime } from '../interfaces/IPassingTimes';
import { LineService } from '../services/line.service';
import { ILine } from '../interfaces/ILine';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {

  trips: ITrip[] = [];
  lines: ILine[] = [];


  constructor(private serviceLine: LineService,private service: TripService) { }

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


  constructor(private serviceLine: LineService,private service: TripService, private serviceP: PassingTimeService, private location: Location) { }

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

  addTrip(key: string, isEmpty: string, orientation: string, line: string, path: string, isGenerated: string) {
    if (!key || !isEmpty || !orientation || !line || !path || !isGenerated) {
      Swal.fire({
        title: 'Aviso!',
        text: "Viagem não foi criada. Parâmetros inválidos.",
        icon: 'warning',
        confirmButtonText: 'Ok',
        timer: 3000,
        showConfirmButton: false,
      })

    } else {
      let passingTripId:String[]=[];

      for(let passingTrip of this.passingTrips){
        passingTripId.push(passingTrip.id);
      }
      this.service.addTrip({
        key: key,
        isEmpty: isEmpty,
        orientation: orientation,
        line: line,
        path: path,
        isGenerated: isGenerated,
        passingTimes: passingTripId,
      } as ITrip).subscribe()

      Swal.fire({
        title: 'Sucesso!',
        text: 'Viagem criada',
        icon: 'success',
        confirmButtonText: 'Ok',
        timer: 3000,
        showConfirmButton: false,
      })
    }
  }

  addPassingTime(id: string): void {
    if (id) {
      this.serviceP.getPassingById(id).subscribe(p =>{
         this.passingTrips.push(p); 
         this.validatePassingTime();});
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

  validatePassingTime(){
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
