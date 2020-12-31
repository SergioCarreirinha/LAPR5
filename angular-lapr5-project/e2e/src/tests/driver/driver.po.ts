
import { browser, by, element } from 'protractor';

export class CreateDriverPage {

  async navigateTo(): Promise<unknown> {
    return browser.get('/createDriver');
  }

  getName() {
    return element(by.name('name'));
  }
  getBirthDate() {
    return element(by.name('birthdate'));
  }
  getDriverLicenseNum() {
    return element(by.name('driverLicenseNum'));
  }
  getLicenseExpiration() {
    return element(by.name('licenseExpiration'));
  }
  getAddButton() {
    return element(by.id('submit'));
  }
}