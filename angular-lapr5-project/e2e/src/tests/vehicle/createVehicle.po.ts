import { browser, by, element } from 'protractor';

export class CreateVehiclePage {

  async navigateTo(): Promise<unknown> {
    return browser.get('/createVehicle');
  }

  getLicensePlate() {
    return element(by.name('licensePlate'));
  }
  getVin() {
    return element(by.name('vin'));
  }
  getVehicleType() {
    return element(by.name('vehicleType'));
  }
  getFirstServiceDate() {
    return element(by.name('firstServiceDate'));
  }

  getAddButton() {
    return element(by.id('submit'));
  }
}