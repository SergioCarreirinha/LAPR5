import { browser, by, element } from 'protractor';

export class CreateNodePage {

  async navigateTo(): Promise<unknown> {
    return browser.get('api/node');
  }

  getKey() {
    return element(by.id('nodeKey'));
  }
  getName() {
    return element(by.id('nodeName'));
  }
  getLatitude() {
    return element(by.id('nodeLatitude'));
  }
  getLongitude() {
    return element(by.id('nodeLongitude'));
  }
  getShortName() {
    return element(by.id('nodeShortName'));
  }
  getIsDepot() {
    return element(by.id('nodeIsDepot'));
  }
  getIsReliefPoint() {
    return element(by.id('nodeIsReliefPoint'));
  }
  getCapacities() {
    return element(by.id('nodeCapacities'));
  }
  getAddButton() {
    return element(by.id('addButton'));
  }
}