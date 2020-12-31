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
  workBlock: IWorkBlock;


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
    //VehicleDuty Parameter verification
    if ( !key || !name || !color || !depots || this.workBlocksVehicleDuty.length === 0) {
      console.log("Invalid Paramaters. VehicleDuty wasn't added");

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
      .subscribe(vehicleDuty => { this.vehicleDuty.push(vehicleDuty); console.log(vehicleDuty)});

    Swal.fire({
      title: 'Success!',
      text: 'Vehicle Duty added',
      icon: 'success',
      confirmButtonText: 'Ok',
      timer: 2500,
      showConfirmButton: false,
    })

  }

  addWorkBlock(id: string): void {
    console.log(id);
    if (id) {
      this.workBlockService.getWorkBlockById(id).subscribe(p =>{ this.workBlocksVehicleDuty.push(p); this.validateWorkBlock();});
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

  validateWorkBlock(){
    if (this.workBlocksVehicleDuty.length === 1) {

      Swal.fire({
        title: 'Success!',
        text: 'Work Block Added ',
        icon: 'success',
        confirmButtonText: 'Ok',
        timer: 2500,
        showConfirmButton: false,
      })

    } else if (this.workBlocksVehicleDuty[this.workBlocksVehicleDuty.length - 2].endTime == this.workBlocksVehicleDuty[this.workBlocksVehicleDuty.length-1].startTime) {

      Swal.fire({
        title: 'Success!',
        text: 'Work Block Added',
        icon: 'success',
        confirmButtonText: 'Ok',
        timer: 2500,
        showConfirmButton: false,
      })

    } else {
      this.workBlocksVehicleDuty.pop();
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

  goBack(): void {
    this.location.back();
  }
}
