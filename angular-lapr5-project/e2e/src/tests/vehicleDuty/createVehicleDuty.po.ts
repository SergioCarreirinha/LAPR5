import { browser, by, element } from 'protractor';

export class CreateVehicleDutyPage {

  async navigateTo(): Promise<unknown> {
    return browser.get('/createvehicleDuty');
  }

  getKey() {
    return element(by.name('key'));
  }
  getName() {
    return element(by.name('name'));
  }
  getColor() {
    return element(by.name('color'));
  }
  getDepots() {
    return element(by.name('depots'));
  }

  getWorkBlock(){
      return element(by.name('workBlock'));
  }

  getAddWorkBlock() {
    return element(by.id('workblockSubmit'));
  }

  getAddVehicleDuty() {
    return element(by.id('submit'));
  }
}