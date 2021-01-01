import { browser, by, element, logging } from 'protractor';
import { LinePage } from './line.po';
import { environment } from '../../../../src/environments/environment';

describe('Line Tests', () => {
  let page: LinePage;
  
  beforeAll(async () => {
    browser.executeScript('localStorage.setItem("token","'+ environment.testing.token +'");');
    
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