import { browser, logging } from 'protractor';
import { CreateNodePage } from './node.po';

describe('workspace-project App', () => {
  let page: CreateNodePage;

  beforeEach(() => {
    page = new CreateNodePage();
    page.navigateTo();
  });

  it('should add node', function () {

    page.getKey().sendKeys("Node:Rob");

    page.getName().sendKeys("Robert");

    page.getLatitude().sendKeys(41.2414);

    page.getLongitude().sendKeys(-8.5);

    page.getShortName().sendKeys("Rob");

    page.getIsDepot().sendKeys("false");

    page.getIsReliefPoint().sendKeys("true");

    page.getCapacities().sendKeys(30);

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
