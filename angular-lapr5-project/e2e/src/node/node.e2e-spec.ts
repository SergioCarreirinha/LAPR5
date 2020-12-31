import { browser, by, element, logging } from 'protractor';
import { CreateNodePage } from './node.po';

describe('Node Tests', () => {
  let page: CreateNodePage;
  beforeAll(async () => {
    browser.executeScript('localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI2MWFhY2U3NS04YjdjLTRkYWYtYWVkNC01YjY3MmE4MTI0ODgiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE2MDkzNzE1MTIsImV4cCI6MTYwOTQ1NzkxMiwiaWF0IjoxNjA5MzcxNTEyfQ.tHhZHvfCE1Is1XtykTmgyjgSyl7FbOvWiW9m2G8iUKw");');
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