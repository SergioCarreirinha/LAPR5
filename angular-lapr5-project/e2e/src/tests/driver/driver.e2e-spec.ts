import { browser, by, element, logging } from 'protractor';
import { CreateDriverPage } from './driver.po';

describe('Driver Tests', () => {
  let page: CreateDriverPage;
  beforeAll(async () => {
    browser.executeScript('localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI2MWFhY2U3NS04YjdjLTRkYWYtYWVkNC01YjY3MmE4MTI0ODgiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE2MDkzNzE1MTIsImV4cCI6MTYwOTQ1NzkxMiwiaWF0IjoxNjA5MzcxNTEyfQ.tHhZHvfCE1Is1XtykTmgyjgSyl7FbOvWiW9m2G8iUKw");');
  });
  describe('Authenticated Tests', () =>{
    
    beforeEach(function(){
      page = new CreateDriverPage();
    });

    it('should add Driver', async () => {

      await page.navigateTo();

      await page.getName().sendKeys("Julia");
  
      await page.getBirthDate().sendKeys("12/8/2000");
  
      await page.getDriverLicenseNum().sendKeys(123455);
  
      await page.getLicenseExpiration().sendKeys("12/8/2030");
  
      await page.getAddButton().click();

      expect(await page.getName().getText()).toEqual("");
    });
  });
});