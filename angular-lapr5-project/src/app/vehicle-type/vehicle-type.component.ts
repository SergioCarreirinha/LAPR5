import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { VehicleTypeService } from '../services/vehicle-type.service';
import { IVehicleType } from '../interfaces/IVehicleType';

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
    this.service.addVehicleType({ key: key, name: name, autonomy: parseInt(autonomy), cost: parseInt(cost), averageSpeed: parseInt(averageSpeed), energySource: parseInt(energySource), consumption: parseInt(consumption), emissions: parseInt(emissions) } as IVehicleType).subscribe(vehicleType => this.vehicleTypes.push(vehicleType))
  }

  goBack(): void {
    this.location.back();
  }
}
