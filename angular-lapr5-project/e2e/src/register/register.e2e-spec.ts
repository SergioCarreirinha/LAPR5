import { browser } from 'protractor';
import { RegisterPage } from './register.po';

describe('Register tests', () => {
    let page: RegisterPage;
    
    beforeEach(() => {
        page = new RegisterPage(); 
    });

    it('Should Register', async () => {
        await page.navigateTo();
        await page.getUsername().sendKeys('User');
        await page.getEmail().sendKeys('user@user.pt')
        await page.getPassword().sendKeys('user12345');
        await page.getButton().click();
        
        expect(await browser.getCurrentUrl()).toEqual(browser.baseUrl+'register');
    });
})