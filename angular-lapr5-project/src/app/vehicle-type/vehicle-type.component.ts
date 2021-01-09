import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { VehicleTypeService } from '../services/vehicle-type/vehicle-type.service';
import { IVehicleType } from '../interfaces/IVehicleType';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-vehicle-type',
  templateUrl: './vehicle-type.component.html',
  styleUrls: ['./vehicle-type.component.css']
})
export class VehicleTypeComponent implements OnInit {

  vehicleTypes: IVehicleType[] = [];

  constructor(private service: VehicleTypeService, private location: Location) { }

  ngOnInit(): void {
    this.getVehicleTypes();
  }

  getVehicleTypes() {
    this.service.getVehicleTypes().subscribe(vehicleType => this.vehicleTypes = vehicleType);
  }

  addVehicleType(key: string, name: string, autonomy: string, cost: string, averageSpeed: string, energySource: string, consumption: string, emissions: string) {
    if (key != '' && name != '' && autonomy != '' && cost != '' && averageSpeed != '' && energySource != '' && consumption != '' && emissions != '') {
      this.service.addVehicleType({ key: key, name: name, autonomy: parseInt(autonomy), cost: parseInt(cost), averageSpeed: parseInt(averageSpeed), energySource: parseInt(energySource), consumption: parseInt(consumption), emissions: parseInt(emissions) } as IVehicleType).subscribe(vehicleType => this.vehicleTypes.push(vehicleType))
      Swal.fire({
        title: 'Success!',
        text: 'Vehicle Type Created',
        icon: 'success',
        confirmButtonText: 'Ok',
        timer: 3000,
        showConfirmButton: false,
      })
    } else {
      Swal.fire({
        title: 'Warning!',
        text: "Vehicle Type couldn't be created. Invalid parameters",
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
