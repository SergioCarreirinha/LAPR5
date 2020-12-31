import { browser, by, element } from 'protractor';

export class CreateNodePage {

  async navigateTo(): Promise<unknown> {
    return browser.get('/createNode');
  }

  getKey() {
    return element(by.name('nodeKey'));
  }
  getName() {
    return element(by.name('nodeName'));
  }
  getLatitude() {
    return element(by.name('nodeLatitude'));
  }
  getLongitude() {
    return element(by.name('nodeLongitude'));
  }
  getShortName() {
    return element(by.name('nodeShortName'));
  }
  getIsDepot() {
    return element(by.name('nodeIsDepot'));
  }
  getIsReliefPoint() {
    return element(by.name('nodeIsReliefPoint'));
  }
  getCapacities() {
    return element(by.name('nodeCapacities'));
  }
  getAddButton() {
    return element(by.id('submit'));
  }
}