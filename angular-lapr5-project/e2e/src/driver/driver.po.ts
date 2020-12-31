import { browser, by, element } from 'protractor';

export class CreateDriverPage {

  async navigateTo(): Promise<unknown> {
    return browser.get('api/driver');
  }

  getName() {
    return element(by.id('name'));
  }
  getBirthDate() {
    return element(by.id('birthdate'));
  }
  getDriverLicenseNum() {
    return element(by.id('driverLicenseNum'));
  }
  getLicenseExpiration() {
    return element(by.id('licenseExpiration'));
  }

  getAddButton() {
    return element(by.id('addButton'));
  }
}