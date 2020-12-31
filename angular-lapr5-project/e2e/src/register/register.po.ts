import { browser, by, element } from 'protractor';

export class RegisterPage {

  async navigateTo(): Promise<unknown> {
    return browser.get('/register');
  }

  getUsername() {
    return element(by.name('username'));
  }
  getEmail() {
    return element(by.name('email'));
  }
  getPassword() {
    return element(by.name('password'));
  }

  getButton() {
    return element(by.id('submit'));
  }
}