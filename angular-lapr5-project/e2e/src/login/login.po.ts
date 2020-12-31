import { browser, by, element } from 'protractor';

export class LoginPage {
    
    async navigateTo(){
        return browser.get('/login');
    }

    getUsernameTextbox() {
        return element(by.name('username'));
    }
    getPasswordTextbox() {
        return element(by.name('password'));
    }
    getButton(){
        return element(by.id('submit'));
    }
}