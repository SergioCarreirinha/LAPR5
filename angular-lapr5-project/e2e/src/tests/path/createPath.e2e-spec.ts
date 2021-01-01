import { browser, by, element, logging } from 'protractor';
import { CreatePathPage } from './createPath.po';
import { environment } from '../../../../src/environments/environment';

describe('Path tests', () => {
    let page: CreatePathPage;

    beforeAll(async () => {
        browser.executeScript('localStorage.setItem("token","'+ environment.testing.token +'");');
    })

    describe('Authenticated tests', () => {

        beforeEach(function () {
            page = new CreatePathPage();
        })


        it('should add PathNode and than path', async () => {
            await page.navigateTo();
            await page.getPathNodeKey().sendKeys('pathNode:1');

            await page.getNode().sendKeys('node:1');

            await page.getDuration().sendKeys(2);

            await page.getDistance().sendKeys(2);

            await page.getAddPathNode().click();

            
            expect(await page.getPathNodeKey().getText()).toEqual('');
            expect(await page.getDuration().getText()).toEqual('');
            expect(await page.getDistance().getText()).toEqual('');

            await page.getLine().sendKeys('line');

            await page.getPathKey().sendKeys('pathKey');

            await page.getToGo().click();

            await page.getIsEmpty().click();

            expect(await page.getPathKey().getText()).toEqual('');
        })

    })
})