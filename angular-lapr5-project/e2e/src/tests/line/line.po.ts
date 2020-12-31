import { browser, by, element } from 'protractor';

export class LinePage {

  async navigateTo(): Promise<unknown> {
    return browser.get('/createLine');
  }

  getLineKey() {
    return element(by.name('lineKey'));
  }
  getLineName() {
    return element(by.name('lineName'));
  }
  getColor() {
    return element(by.name('color'));
  }
  getButton() {
    return element(by.id('submit'));
  }
}