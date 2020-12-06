import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { DriverTypeService } from '../services/driver-type.service';
import { IDriverType } from '../interfaces/IDriverType';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-driver-type',
  templateUrl: './driver-type.component.html',
  styleUrls: ['./driver-type.component.css']
})
export class DriverTypeComponent implements OnInit {

  driverTypes: IDriverType[] = [];

  constructor(private service: DriverTypeService, private location: Location) { }

  ngOnInit(): void {
    this.getDriverTypes();
  }

  getDriverTypes() {
    this.service.getDriverTypes().subscribe(driverType => this.driverTypes = driverType);
  }

  addDriverType(description: string) {
    this.service.addDriverType({ description: description } as IDriverType).subscribe(driverType => this.driverTypes.push(driverType));
    Swal.fire({
      title: 'Success!',
      text: 'Driver Type Created',
      icon: 'success',
      confirmButtonText: 'Ok',
      timer: 2500,
      showConfirmButton: false,
    })
  }

  goBack(): void {
    this.location.back();
  }

}
