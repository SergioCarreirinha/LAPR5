import { browser, by, element } from 'protractor';

export class CreateDriverDutyPage {

  async navigateTo(): Promise<unknown> {
    return browser.get('/createDriverDuty');
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
  getType() {
    return element(by.name('DriverDutyType'));
  }

  getWorkBlock(){
      return element(by.name('workBlock'));
  }

  getAddWorkBlock() {
    return element(by.id('DriverDutyWorkblockSubmit'));
  }

  getAddDriverDuty() {
    return element(by.id('DriverDutysubmit'));
  }
}