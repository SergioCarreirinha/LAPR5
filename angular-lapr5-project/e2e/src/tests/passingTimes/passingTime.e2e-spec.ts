import { browser, by, element, logging } from 'protractor';
import { CreatePassingTimesPage } from './passingTime.po';
import { environment } from '../../../../src/environments/environment';

describe('Passing Times Tests', () => {
  let page: CreatePassingTimesPage;
  beforeAll(async () => {
    browser.executeScript('localStorage.setItem("token","'+ environment.testing.token +'");');
  });
  describe('Authenticated Tests', () =>{
    
    beforeEach(function(){
      page = new CreatePassingTimesPage();
    });

    it('should add Passing Time', async () => {

        await page.navigateTo();

        page.getKey().sendKeys("PassingTime:99");

        page.getTime().sendKeys("38000");

        page.getNode().sendKeys("Node:1");

        page.getIsUsed().sendKeys("true");

        page.getIsReliefPoint().sendKeys("true");

        page.getAddButton().click();

        expect(await page.getKey().getText()).toEqual("");

    });
  });
});