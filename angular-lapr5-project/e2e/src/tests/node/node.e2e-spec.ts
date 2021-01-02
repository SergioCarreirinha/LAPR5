import { browser, by, element, logging } from 'protractor';
import { CreateNodePage } from './node.po';
import { environment } from '../../../../src/environments/environment';

describe('Node Tests', () => {
  let page: CreateNodePage;
  beforeAll(async () => {
    browser.executeScript('localStorage.setItem("token","'+ environment.testing.token +'");');
  });
  describe('Authenticated Tests', () =>{
    
    beforeEach(function(){
      page = new CreateNodePage();
    });

    it('should add Node', async () => {

      await page.navigateTo();

      page.getKey().sendKeys("Node:Rob");

        page.getName().sendKeys("Robert");

        page.getLatitude().sendKeys(41.2414);

        page.getLongitude().sendKeys(-8.5);

        page.getShortName().sendKeys("Rob");

        page.getIsDepot().sendKeys("false");

        page.getIsReliefPoint().sendKeys("true");

        page.getCapacities().sendKeys(30);

        page.getAddButton().click();

        expect(await page.getKey().getText()).toEqual("");

    });
  });
});