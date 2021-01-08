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
      } as IDriver).subscribe()
      Swal.fire({
        title: 'Success!',
        text: 'Driver Created',
        icon: 'success',
        confirmButtonText: 'Ok',
        timer: 2500,
        showConfirmButton: true,
      })
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Verify Fields!',
        icon: 'error',
        confirmButtonText: 'Ok',
        timer: 2500,
        showConfirmButton: true,
      })
    }
  }
}
