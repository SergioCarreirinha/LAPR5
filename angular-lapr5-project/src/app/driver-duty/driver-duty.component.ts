import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { IDriverDuty } from '../interfaces/IDriverDuty';
import { DriverDutyTypeService } from '../services/driver-duty-type/driver-duty-type.service';
import { DriverDutyService } from '../services/driver-duty/driver-duty.service';
import { WorkBlockService } from '../services/work-block/work-block.service';

@Component({
  selector: 'app-driver-duty',
  templateUrl: './driver-duty.component.html',
  styleUrls: ['./driver-duty.component.css']
})
export class DriverDutyComponent implements OnInit {
  
  workBlocks: any[] = [];
  workBlocksDriverDuty: any[] = [];
  driverDutyTypes: any[] = [];

  constructor(private workBlockService: WorkBlockService, private driverDutyService: DriverDutyService,private driverDutyTypeService: DriverDutyTypeService) { }

  ngOnInit(): void {
    this.getWorkBlocks();
    this.getDriverDutyType();
  }

  getWorkBlocks() {
    this.workBlockService.getWorkBlocks().subscribe(workBlock => this.workBlocks = workBlock);
  }
  getDriverDutyType(){
    this.driverDutyTypeService.getDriverDutyType().subscribe(driverDutyType => this.driverDutyTypes = driverDutyType);
  }

  addDriverDuty(key: string, name: string, color: string, type: string) {
    console.log(key);
    //DriverDuty Parameter verification
    if (!key || !name || !color || !type || this.workBlocksDriverDuty.length === 0) {
      console.log("Invalid Paramaters. DriverDuty wasn't added");

      Swal.fire({
        title: 'Warning!',
        text: "DriverDuty couldn't be added. Invalid Paramaters.",
        icon: 'warning',
        confirmButtonText: 'Ok',
        timer: 2500,
        showConfirmButton: false,
      })

      return;
    }

    let workBlockId: String[] = [];

    for (let workBlockString of this.workBlocksDriverDuty) {
      workBlockId.push(workBlockString.id);
    }
    this.driverDutyService.addDriverDuty({
      key: key,
      name: name,
      color: color,
      type: type,
      workBlocks: workBlockId
    } as IDriverDuty)
      .subscribe((res: any) => {
        console.log(res+"HER");
          Swal.fire({
            title: 'Success!',
            text: 'DriverDuty added',
            icon: 'success',
            confirmButtonText: 'Ok',
            timer: 2500,
            showConfirmButton: false,
          })
          this.workBlocksDriverDuty = [];
      },
      err => {
        console.log(err);
        if(err.status==400){
          Swal.fire({
            title: 'Error!',
            text: 'There is a DriverDuty with that Key',
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
        this.workBlocksDriverDuty.push(p);
        this.validateWorkBlock();
        console.log(p);
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
    if (this.workBlocksDriverDuty.length === 1) {

      Swal.fire({
        title: 'Success!',
        text: 'Work Block Added ',
        icon: 'success',
        confirmButtonText: 'Ok',
        timer: 2500,
        showConfirmButton: false,
      })

    } else if (this.workBlocksDriverDuty[this.workBlocksDriverDuty.length - 2].endTime == this.workBlocksDriverDuty[this.workBlocksDriverDuty.length - 1].startTime) {

      Swal.fire({
        title: 'Success!',
        text: 'Work Block Added',
        icon: 'success',
        confirmButtonText: 'Ok',
        timer: 2500,
        showConfirmButton: false,
      })

    } else {
      this.workBlocksDriverDuty.pop();
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
@Component({
  selector: 'app-driver-duty-list',
  templateUrl: './driver-duty-list.component.html',
  styleUrls: ['./driver-duty.component.css']
})
export class DriverDutyListComponent implements OnInit {

  DriverDuties: IDriverDuty[] = [];


  constructor(private service: DriverDutyService) { }

  ngOnInit(): void {
    this.getDriverDuties();
  }

  private getDriverDuties() {
    this.service.getDriverDuty().subscribe(DriverDuty => this.DriverDuties = DriverDuty);
  }
}
