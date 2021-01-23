import { browser, by, element, logging } from 'protractor';
import { CreateDriverDutyPage } from './createDriverDuty.po';
import { environment } from '../../../../src/environments/environment';

describe('Driver Duty Tests', () => {
  let page: CreateDriverDutyPage;
  beforeAll(async () => {
    browser.executeScript('localStorage.setItem("token","'+ environment.testing.token +'");');
  });
  describe('Authenticated Tests', () =>{
    
    beforeEach(function(){
      page = new CreateDriverDutyPage();
    });

    it('should add driver Duty', async () => {

      await page.navigateTo();

      await page.getKey().sendKeys("1234");
  
      await page.getName().sendKeys("1234");
  
      await page.getColor().sendKeys("1234");
  
      await page.getType().sendKeys("DriverDutyType:3");

      await page.getWorkBlock().sendKeys("018ed41d-5e5d-4211-8dc3-954c104fd3b9");
  
      await page.getAddWorkBlock().click();

      await page.getAddDriverDuty().click();

      expect(await page.getKey().getText()).toEqual("");

      expect(await page.getName().getText()).toEqual("");

      expect(await page.getColor().getText()).toEqual("");
    });
  });
});