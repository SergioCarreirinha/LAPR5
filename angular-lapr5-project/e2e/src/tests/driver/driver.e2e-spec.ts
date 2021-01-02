import { browser, by, element, logging } from 'protractor';
import { environment } from '../../../../src/environments/environment';
import { CreateDriverPage } from './driver.po';

describe('Driver Tests', () => {
  let page: CreateDriverPage;
  beforeAll(async () => {
    browser.executeScript('localStorage.setItem("token","'+ environment.testing.token +'");');

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