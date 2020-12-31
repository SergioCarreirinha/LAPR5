import { browser, by, element, logging } from 'protractor';
import { LinePage } from './line.po';

describe('Line Tests', () => {
  let page: LinePage;
  
  beforeAll(async () => {
    browser.executeScript('localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI2MWFhY2U3NS04YjdjLTRkYWYtYWVkNC01YjY3MmE4MTI0ODgiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE2MDkzNzE1MTIsImV4cCI6MTYwOTQ1NzkxMiwiaWF0IjoxNjA5MzcxNTEyfQ.tHhZHvfCE1Is1XtykTmgyjgSyl7FbOvWiW9m2G8iUKw");');
    
  });
  describe('Authenticated Tests', () =>{
    
    beforeEach(function(){
      page = new LinePage();
    });

    it('should add Line', async () => {
      await page.navigateTo();

      await page.getLineKey().sendKeys("1234");
  
      await page.getLineName().sendKeys("1234");
  
      await page.getColor().sendKeys("RGB(231,5,47)");
      
      await page.getButton().click();

      expect(await page.getLineKey().getText()).toEqual("");
    });
  });
});