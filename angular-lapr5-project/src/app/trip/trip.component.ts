import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { TripService } from '../services/trip.service';
import { ITrip } from '../interfaces/ITrip';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.css']
})
export class TripComponent implements OnInit {

  trip: ITrip[] = [];


  constructor(private service: TripService, private location: Location) { }

  ngOnInit(): void {
    this.getTrip();
  }

  getTrip() {
    this.service.getTrips().subscribe(trip => this.trip = trip);
  }

  addTrip(key: string, isEmpty: boolean, orientation: string, line: string, path: string, isGenerated: boolean, passingTimes: string) {
    if (!key || !isEmpty || !orientation || !line || !path || !isGenerated || !passingTimes) {
      Swal.fire({
        title: 'Aviso!',
        text: "Viagem não foi criada. Parâmetros inválidos.",
        icon: 'warning',
        confirmButtonText: 'Ok',
        timer: 3000,
        showConfirmButton: false,
      })

    } else {
      this.service.addTrip({
        key: key,
        isEmpty: isEmpty,
        orientation: orientation,
        line: line,
        path: path,
        isGenerated: isGenerated,
        passingTimes: passingTimes,
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

  goBack(): void {
    this.location.back();
  }
}
