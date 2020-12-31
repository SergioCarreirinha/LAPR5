import { browser, logging } from 'protractor';
import { CreateDriverPage } from './driver.po';

describe('workspace-project App', () => {
  let page: CreateDriverPage;

  beforeEach(() => {
    page = new CreateDriverPage();
    page.navigateTo();
  });

  it('should add driver', function () {

    page.getName().sendKeys("Roberts");

    page.getBirthDate().sendKeys("2020-12-31");

    page.getDriverLicenseNum().sendKeys(1231241212);

    page.getLicenseExpiration().sendKeys("2021-12-31");

    page.getAddButton().click();

    browser.wait(function () {
        return browser.switchTo().alert().then(
            function () { return true; },
            function () { return false; }
        );
    });

    browser.switchTo().alert().then((alert) => {
        expect(alert.getText()).toString().includes("Invalid Paramaters. Driver wasnt added");
    alert.dismiss();
    })

});
});
