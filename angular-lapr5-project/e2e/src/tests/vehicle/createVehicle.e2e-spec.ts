import { browser, by, element, logging } from 'protractor';
import { CreateVehiclePage } from './createVehicle.po';

describe('Vehicle Tests', () => {
  let page: CreateVehiclePage;
  beforeAll(async () => {
    browser.executeScript('localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI2MWFhY2U3NS04YjdjLTRkYWYtYWVkNC01YjY3MmE4MTI0ODgiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE2MDkzNzE1MTIsImV4cCI6MTYwOTQ1NzkxMiwiaWF0IjoxNjA5MzcxNTEyfQ.tHhZHvfCE1Is1XtykTmgyjgSyl7FbOvWiW9m2G8iUKw");');
  });
  describe('Authenticated Tests', () =>{
    
    beforeEach(function(){
      page = new CreateVehiclePage();
    });

    it('should add vehicle', async () => {

      await page.navigateTo();

      await page.getLicensePlate().sendKeys("1234");
  
      await page.getVin().sendKeys("1234");
  
      await page.getVehicleType().sendKeys("autocarro");
  
      await page.getFirstServiceDate().sendKeys("12/8/2030");
  
      await page.getAddButton().click();

      expect(await page.getLicensePlate().getText()).toEqual("");
    });
  });
});