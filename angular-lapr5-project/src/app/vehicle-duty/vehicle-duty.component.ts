import { Component, OnInit } from '@angular/core';
import { VehicleDutyService } from '../services/vehicle-duty.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { IWorkBlock } from '../interfaces/IWorkBlock';
import { WorkBlockService } from '../services/work-block.service';
import { IVehicleDuty } from '../interfaces/IVehicleDuty';

@Component({
  selector: 'app-vehicleDuty',
  templateUrl: './vehicle-duty.component.html',
  styleUrls: ['./vehicle-duty.component.css']
})
export class VehicleDutyComponent implements OnInit {

  workBlocks: IWorkBlock[] = [];
  workBlocksVehicleDuty: IWorkBlock[] = [];
  vehicleDuty: IVehicleDuty[] = [];


  constructor(private workBlockService: WorkBlockService, private vehicleDutyService: VehicleDutyService, private location: Location) { }

  ngOnInit(): void {
    this.getWorkBlocks();
  }

  getWorkBlocks() {
    this.workBlockService.getWorkBlocks().subscribe(workBlock => this.workBlocks = workBlock);
  }

  getVehicleDuty() {
    this.vehicleDutyService.getVehicleDuty().subscribe(vehicleDuty => this.vehicleDuty = vehicleDuty);
  }


  addVehicleDuty(key: string, name: string, color: string, depots: string) {

    //PathNode Parameter verification
    if (((!key || !name || !color || !depots) && this.workBlocks.length !== 0) ||
      ((!key || !name) && this.workBlocks.length === 0)) {
      console.log("Invalid Paramaters. PathNode wasn't added");

      Swal.fire({
        title: 'Warning!',
        text: "Vehicle Duty couldn't be added. Invalid Paramaters.",
        icon: 'warning',
        confirmButtonText: 'Ok',
        timer: 2500,
        showConfirmButton: false,
      })

      return;
    }

    this.vehicleDutyService.addVehicleDuty({
      key: key,
      name: name,
      color: color,
      depots: depots,
      workBlocks: this.workBlocksVehicleDuty
    } as IVehicleDuty)
      .subscribe(vehicleDuty => { this.vehicleDuty.push(vehicleDuty) });

    Swal.fire({
      title: 'Success!',
      text: 'Vehicle Duty added',
      icon: 'success',
      confirmButtonText: 'Ok',
      timer: 2500,
      showConfirmButton: false,
    })

  }

  addWorkBlock(workBlock: IWorkBlock): void {
    if (this.workBlocksVehicleDuty.length === 0) {
      this.workBlocksVehicleDuty.push(workBlock);

      Swal.fire({
        title: 'Success!',
        text: 'Work Block Added',
        icon: 'success',
        confirmButtonText: 'Ok',
        timer: 2500,
        showConfirmButton: false,
      })

    } else{
      if(this.workBlocksVehicleDuty[this.workBlocksVehicleDuty.length-1].endTime == workBlock.startTime){
        this.workBlocksVehicleDuty.push(workBlock);

        Swal.fire({
          title: 'Success!',
          text: 'Work Block Added',
          icon: 'success',
          confirmButtonText: 'Ok',
          timer: 2500,
          showConfirmButton: false,
        })
      }else{
        Swal.fire({
          title: 'Warning!',
          text: "WorkBlock needs to be contiguous. Please enter a valid workblock.",
          icon: 'warning',
          confirmButtonText: 'Ok',
          timer: 2500,
          showConfirmButton: false,
        })
      }
    }
  }

  goBack(): void {
    this.location.back();
  }
}
