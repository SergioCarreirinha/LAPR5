import { browser, by, element } from 'protractor';

export class CreatePassingTimesPage {

  async navigateTo(): Promise<unknown> {
    return browser.get('/createPassingTimes');
  }

  getKey() {
    return element(by.name('passingTimeKey'));
  }
  getTime() {
    return element(by.name('passingTimeT'));
  }
  getNode() {
    return element(by.name('passingTimeNode'));
  }
  getIsUsed() {
    return element(by.name('passingTimeIsUsed'));
  }
  getIsReliefPoint() {
    return element(by.name('passingTimeIsReliefPoint'));
  }
  getAddButton() {
    return element(by.id('submit'));
  }
}