import { browser } from 'protractor';
import { LoginPage } from './login.po';

describe('Login tests', () => {
    let page: LoginPage;
    
    beforeEach(() => {
        page = new LoginPage(); 
    });

    it('Should Login', async () => {
        await page.navigateTo();
        await page.getUsernameTextbox().sendKeys('admin');
        await page.getPasswordTextbox().sendKeys('Grupo25');
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(valLocalStorage);
    });

    it("Shouldn't login", async () => {
        await page.navigateTo();
        await page.getUsernameTextbox().sendKeys('');
        await page.getPasswordTextbox().sendKeys('');
        await page.getButton().click();
        let valLocalStorage = browser.executeScript("return window.localStorage.getItem('token');");
        expect(!valLocalStorage);
    });
})