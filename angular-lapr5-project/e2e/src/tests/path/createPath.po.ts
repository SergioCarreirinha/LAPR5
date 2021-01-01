import { browser, by, element } from 'protractor';

export class CreatePathPage {

    async navigateTo(): Promise<unknown> {
        return browser.get('/createPath');
    }

    getPathNodeKey(){
        return element(by.name('pathNodeKey'));
    }

    getNode(){
        return element(by.name('nodeKey'));
    }

    getDuration(){
        return element(by.name('duration'));
    }

    getDistance(){
        return element(by.name('distance'));
    }

    getAddPathNode(){
        return element(by.id('addPathNode'));
    }

    getLine(){
        return element(by.name('line'));
    }

    getPathKey(){
        return element(by.name('pathKey'));
    }

    getToGo(){
        return element(by.name('toGo'));
    }

    getIsEmpty(){
        return element(by.name('isEmpty'));
    }

    getCreatePath(){
        return element(by.id('createPath'))
    }
}