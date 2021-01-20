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

  constructor(private service: VehicleTypeService) { }

  ngOnInit(): void {
    this.getVehicleTypes();
  }

  getVehicleTypes() {
    this.service.getVehicleTypes().subscribe(vehicleType => this.vehicleTypes = vehicleType);
  }

  addVehicleType(key: string, name: string, autonomy: string, cost: string, averageSpeed: string, energySource: string, consumption: string, emissions: string) {
    if (key != '' && name != '' && autonomy != '' && cost != '' && averageSpeed != '' && energySource != '' && consumption != '' && emissions != '') {
      this.service.addVehicleType({ key: key, name: name, autonomy: parseInt(autonomy), cost: parseInt(cost), averageSpeed: parseInt(averageSpeed), energySource: parseInt(energySource), consumption: parseInt(consumption), emissions: parseInt(emissions) } as IVehicleType).subscribe((res:any) => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Tipo de veiculo criado!',
          icon: 'success',
          confirmButtonText: 'Ok',
          timer: 3000,
          showConfirmButton: false,
        })
      }, (err:any) => {
        if(err.status == 406){
          Swal.fire({
            title: 'Erro!',
            text: "Já existe um tipo de veiculo com essa chave!",
            icon: 'error',
            confirmButtonText: 'Ok',
            timer: 3000,
            showConfirmButton: false,
          })
        }
      })
      
    } else {
      Swal.fire({
        title: 'Aviso!',
        text: "O Tipo de veiculo não pode ser criado, parametros inválidos!",
        icon: 'warning',
        confirmButtonText: 'Ok',
        timer: 3000,
        showConfirmButton: false,
      })
    }
  }
}
