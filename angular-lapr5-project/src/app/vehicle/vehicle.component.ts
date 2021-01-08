import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { IVehicle } from '../interfaces/IVehicle';
import { VehicleService } from '../services/vehicle/vehicle.service';
import { Location } from '@angular/common';
import { IVehicleType } from '../interfaces/IVehicleType';
import { VehicleTypeService } from '../services/vehicle-type/vehicle-type.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {

  constructor(private vehicleService: VehicleService, private vehicleTypeService: VehicleTypeService, private location: Location) { }

  vehicleTypes: IVehicleType[] = [];

  ngOnInit(): void {
    this.getVehicleTypes();
  }

  getVehicleTypes() {
    this.vehicleTypeService.getVehicleTypes().subscribe(types => this.vehicleTypes = types);
  }

  addVehicle(licensePlate: string, vin: string, vehicleType: string, firstServiceDate: string) {
    licensePlate = licensePlate.trim();
    vin = vin.trim();
    vehicleType = vehicleType.trim();
    firstServiceDate = firstServiceDate.trim();

    if (!licensePlate || !vin || !vehicleType || !firstServiceDate) {
      console.log('Invalid Paramaters. Vehicle wasnt added');

      Swal.fire({
        title: 'Warning!',
        text: "Vehicle couldn't be added. Invalid Paramaters.",
        icon: 'warning',
        confirmButtonText: 'Ok',
        timer: 2500,
        showConfirmButton: false,
      })

      return;
    }

    this.vehicleService.addVehicle({
      licensePlate: licensePlate,
      vin: vin,
      vehicleType: vehicleType,
      firstServiceDate: firstServiceDate
    } as IVehicle)
      .subscribe()

    Swal.fire({
      title: 'Success!',
      text: 'Vehicle Created',
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
