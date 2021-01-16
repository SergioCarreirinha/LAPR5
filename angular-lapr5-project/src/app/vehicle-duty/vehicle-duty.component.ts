import { Component, OnInit } from '@angular/core';
import { VehicleDutyService } from '../services/vehicle-duty/vehicle-duty.service';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { IWorkBlock } from '../interfaces/IWorkBlock';
import { WorkBlockService } from '../services/work-block/work-block.service';
import { IVehicleDuty } from '../interfaces/IVehicleDuty';

@Component({
  selector: 'app-vehicleDuty',
  templateUrl: './vehicle-duty.component.html',
  styleUrls: ['./vehicle-duty.component.css']
})
export class VehicleDutyComponent implements OnInit {

  workBlocks: any[] = [];
  workBlocksVehicleDuty: any[] = [];
  workBlockId: String[] = [];

  constructor(private workBlockService: WorkBlockService, private vehicleDutyService: VehicleDutyService, private location: Location) { }

  ngOnInit(): void {
    this.getWorkBlocks();
  }

  getWorkBlocks() {
    this.workBlockService.getWorkBlocks().subscribe(workBlock => this.workBlocks = workBlock);
  }

  addVehicleDuty(key: string, name: string, color: string, depots: string) {
    //VehicleDuty Parameter verification
    if (!key || !name || !color || !depots || this.workBlocksVehicleDuty.length === 0) {
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

    let workBlockId: String[] = [];

    for (let workBlockString of this.workBlocksVehicleDuty) {
      workBlockId.push(workBlockString.id);
    }


    this.vehicleDutyService.addVehicleDuty({
      key: key,
      name: name,
      color: color,
      depots: depots,
      workBlocks: workBlockId
    } as IVehicleDuty)
      .subscribe((res: any) => {

        Swal.fire({
          title: 'Success!',
          text: 'Vehicle Duty added',
          icon: 'success',
          confirmButtonText: 'Ok',
          timer: 2500,
          showConfirmButton: false,
        })
        this.workBlocksVehicleDuty = [];
      },
        err => {
          console.log(err);
          if (err.status == 400) {
            Swal.fire({
              title: 'Error!',
              text: 'There is a vehicleDuty with that Key',
              icon: 'error',
              confirmButtonText: 'Ok',
              timer: 2500,
              showConfirmButton: false,
            })
          }
        }
      );
  }

  addWorkBlock(id: string): void {
    if (id) {
      this.workBlockService.getWorkBlockById(id).subscribe(p => {
        p.isActive = false;
        this.workBlocksVehicleDuty.push(p);
        this.validateWorkBlock();
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

  validateWorkBlock() {
    if (this.workBlocksVehicleDuty.length === 1) {

      Swal.fire({
        title: 'Success!',
        text: 'Work Block Added ',
        icon: 'success',
        confirmButtonText: 'Ok',
        timer: 2500,
        showConfirmButton: false,
      })

    } else if (this.workBlocksVehicleDuty[this.workBlocksVehicleDuty.length - 2].endTime == this.workBlocksVehicleDuty[this.workBlocksVehicleDuty.length - 1].startTime) {

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

@Component({
  selector: 'app-vehicleDuty',
  templateUrl: './listVehicleDuties.component.html',
  styleUrls: ['./vehicle-duty.component.css']
})
export class ListVehicleDutyComponent implements OnInit {

  vehicleDuties: IVehicleDuty[] = [];

  constructor(private workBlockService: WorkBlockService, private vehicleDutyService: VehicleDutyService, private location: Location) { }

  ngOnInit(): void {
    this.getVehicleDuty();
  }

  getVehicleDuty() {
    this.vehicleDutyService.getVehicleDuty().subscribe(vehicleDuty => this.vehicleDuties = vehicleDuty);
  }
}