import { browser, by, element, logging } from 'protractor';
import { CreateVehicleDutyPage } from './createVehicleDuty.po';
import { environment } from '../../../../src/environments/environment';

describe('Vehicle Duty Tests', () => {
  let page: CreateVehicleDutyPage;
  beforeAll(async () => {
    browser.executeScript('localStorage.setItem("token","'+ environment.testing.token +'");');
  });
  describe('Authenticated Tests', () =>{
    
    beforeEach(function(){
      page = new CreateVehicleDutyPage();
    });

    it('should add vehicle Duty', async () => {

      await page.navigateTo();

      await page.getKey().sendKeys("1234");
  
      await page.getName().sendKeys("1234");
  
      await page.getColor().sendKeys("1234");
  
      await page.getDepots().sendKeys("1234");

      await page.getWorkBlock().sendKeys("08249fe3-8864-4ec3-92d5-c298284d0a3d");
  
      await page.getAddWorkBlock().click();

      await page.getAddVehicleDuty().click();

      expect(await page.getKey().getText()).toEqual("");

      expect(await page.getName().getText()).toEqual("");

      expect(await page.getColor().getText()).toEqual("");

      expect(await page.getDepots().getText()).toEqual("");
    });
  });
});