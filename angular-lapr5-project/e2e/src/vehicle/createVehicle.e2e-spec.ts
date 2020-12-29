import { browser, logging } from 'protractor';
import { CreateVehiclePage } from './createVehicle.po';

describe('workspace-project App', () => {
  let page: CreateVehiclePage;

  beforeEach(() => {
    page = new CreateVehiclePage();
    page.navigateTo();
  });

  it('should add vehicle', function () {

    page.getLicensePlate().sendKeys("1234");

    page.getVin().sendKeys("1234");

    page.getVehicleType().sendKeys("autocarro");

    page.getFirstServiceDate().sendKeys("12/8/2030");

    page.getAddButton().click();

    browser.wait(function () {
        return browser.switchTo().alert().then(
            function () { return true; },
            function () { return false; }
        );

    });

    browser.switchTo().alert().then((alert) => {
        expect(alert.getText()).toString().includes("Invalid Paramaters. Vehicle wasnt added");
    alert.dismiss();
    })

});

});