import { browser, by, element, logging } from 'protractor';
import { CreatePathPage } from './createPath.po';

describe('Path tests', () => {
    let page: CreatePathPage;

    beforeAll(async () => {
        browser.executeScript('localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI2MWFhY2U3NS04YjdjLTRkYWYtYWVkNC01YjY3MmE4MTI0ODgiLCJyb2xlIjoiQWRtaW4iLCJuYmYiOjE2MDkzNzE1MTIsImV4cCI6MTYwOTQ1NzkxMiwiaWF0IjoxNjA5MzcxNTEyfQ.tHhZHvfCE1Is1XtykTmgyjgSyl7FbOvWiW9m2G8iUKw");');
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