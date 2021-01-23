import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { IDriver } from '../interfaces/IDriver';
import { DriverService } from '../services/driver/driver.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  constructor(private driverService: DriverService) { }

  ngOnInit(): void {
  }

  createDriver(name: string, birthdate: string, driverLicenseNum: string, licenseExpiration: string) {

    if (birthdate != '' && name != '' && driverLicenseNum != '' && licenseExpiration != '') {
      this.driverService.createDriver({
        name: name,
        birthdate: birthdate,
        driverLicenseNum: parseInt(driverLicenseNum),
        licenseExpiration: licenseExpiration
      } as IDriver).subscribe((res: any) => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Condutor Criado',
          icon: 'success',
          confirmButtonText: 'Ok',
          timer: 2500,
          showConfirmButton: false,
        })

      }, (err: any) => {
        if (err.status == 400) {
          Swal.fire({
            title: 'Erro!',
            text: 'Já existe um condutor com essa carta de condução',
            icon: 'error',
            confirmButtonText: 'Ok',
            timer: 2500,
            showConfirmButton: false,
          })
        }
      })
    } else {
      Swal.fire({
        title: 'Aviso!',
        text: 'Parametros Inválidos',
        icon: 'warning',
        confirmButtonText: 'Ok',
        timer: 2500,
        showConfirmButton: false,
      })
    }
  }
}
