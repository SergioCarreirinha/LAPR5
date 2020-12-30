import { browser, by, element } from 'protractor';

export class CreateVehiclePage {

  async navigateTo(): Promise<unknown> {
    return browser.get('api/createVehicle');
  }

  getLicensePlate() {
    return element(by.id('licensePlate'));
  }
  getVin() {
    return element(by.id('vin'));
  }
  getVehicleType() {
    return element(by.id('vehicleType'));
  }
  getFirstServiceDate() {
    return element(by.id('firstServiceDate'));
  }

  getAddButton() {
    return element(by.id('addButton'));
  }
}