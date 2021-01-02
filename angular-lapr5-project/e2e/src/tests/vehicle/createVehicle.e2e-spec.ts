import { browser, by, element, logging } from 'protractor';
import { CreateVehiclePage } from './createVehicle.po';
import { environment } from '../../../../src/environments/environment';

describe('Vehicle Tests', () => {
  let page: CreateVehiclePage;
  beforeAll(async () => {
    browser.executeScript('localStorage.setItem("token","'+ environment.testing.token +'");');
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