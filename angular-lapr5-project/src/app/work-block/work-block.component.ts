import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { WorkBlockService } from '../services/work-block.service';
import { IWorkBlock } from '../interfaces/IWorkBlock';
import Swal from 'sweetalert2';
import { TripService } from '../services/trip.service';
import { ITrip } from '../interfaces/ITrip';


@Component({
  selector: 'app-work-block',
  templateUrl: './work-block.component.html',
  styleUrls: ['./work-block.component.css']
})
export class WorkBlockComponent implements OnInit {

  workBlock: IWorkBlock[] = [];
  trips: ITrip[] = [];
  tripsWorkBlock: ITrip[] = [];



  constructor(private tripService: TripService, private workBlockService: WorkBlockService, private location: Location) { }

  ngOnInit(): void {
    this.getTrips();
  }

  getTrips() {
    this.tripService.getTrips().subscribe(trip => this.trips = trip);
  }

  getWorkBlock() {
    this.workBlockService.getWorkBlocks().subscribe(workBlock => this.workBlock = workBlock);
  }

  addWorkBlock(key: string, startTime: string, endTime: string, startNode: string, endNode: string, isCrewTravelTime: boolean, isActive: boolean) {
    if (!key || !startTime || !endTime || !startNode || !endNode) {
      Swal.fire({
        title: 'Aviso!',
        text: "Bloco de Trabalho não foi criado. Parâmetros inválidos.",
        icon: 'warning',
        confirmButtonText: 'Ok',
        timer: 3000,
        showConfirmButton: false,
      })

    } else {
      this.workBlockService.addWorkBlock({
        key: key,
        startTime: parseInt(startTime),
        endTime: parseInt(endTime),
        startNode: startNode,
        endNode: endNode,
        isCrewTravelTime: isCrewTravelTime,
        isActive: isActive
      } as IWorkBlock).subscribe()

      Swal.fire({
        title: 'Sucesso!',
        text: 'Bloco de Trabalho criado',
        icon: 'success',
        confirmButtonText: 'Ok',
        timer: 3000,
        showConfirmButton: false,
      })
    }
  }

  addTrip(id: string): void {
    console.log(id);
    if (id) {
      this.tripService.getTripById(id).subscribe(p => { this.tripsWorkBlock.push(p); this.validateTrip(); });
    } else {
      Swal.fire({
        title: 'Warning!',
        text: "Can't add empty Trip",
        icon: 'warning',
        confirmButtonText: 'Ok',
        timer: 2500,
        showConfirmButton: false,
      })
    }
  }

  validateTrip() {
    if (this.tripsWorkBlock.length === 1) {

      Swal.fire({
        title: 'Successo!',
        text: 'Viagem Adicionada ',
        icon: 'success',
        confirmButtonText: 'Ok',
        timer: 3000,
        showConfirmButton: false,
      })

    } else {
      this.tripsWorkBlock.pop();
      Swal.fire({
        title: 'Aviso!',
        text: "Por favor introduza uma viagem válida.",
        icon: 'warning',
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
