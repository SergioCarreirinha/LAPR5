import { Component, OnInit } from '@angular/core';
import { IDriver } from '../interfaces/IDriver';
import { DriverService } from '../services/driver.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  constructor(private driverService: DriverService) { }

  ngOnInit(): void {
  }

  createDriver(name: string, birthdate: Date, driverLicenseNum: string, licenseExpiration: Date){
    this.driverService.createDriver({
      name: name,
      birthdate: birthdate,
      driverLicenseNum: parseInt(driverLicenseNum),
      licenseExpiration: licenseExpiration
    } as IDriver).subscribe()
  }
}
