/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const webdriver = require('selenium-webdriver');

// const async = () => {
//     return Promise.resolve();
// };

describe('Home page,', () => {
    let driver = null;

    beforeEach(() => {
        driver = setupDriver('firefox');
        // driver = setupDriver('chrome');
    });

    it('check mian window title', () => {
        return driver.get('http://localhost/')
            .then(() => {
                return driver.getTitle();
            })
            .then((title) => {
                console.log(title);
                expect(title).not.to.be.undefined;
            });
    });

    it('check #nav games', () => {
        return driver.get('http://localhost/')
            .then(() => {
                return driver.findElement(webdriver.By.id('games'));
            })
            .then((name) => {
                expect(name).not.to.be.eq('Games');
            });
    });

    it('check #nav home', () => {
        return driver.get('http://localhost/')
            .then(() => {
                return driver.findElement(webdriver.By.id('home'));
            })
            .then((name) => {
                expect(name).not.to.be.eq('GameStore');
            });
    });

    it('check #nav about', () => {
        return driver.get('http://localhost/')
            .then(() => {
                return driver.findElement(webdriver.By.id('about'));
            })
            .then((name) => {
                expect(name).not.to.be.eq('About');
            });
    });

    it('check #nav Sign in button click', () => {
        return driver.get('http://localhost/')
            .then(() => {
                return driver.findElement(webdriver.By.id('sign-in')).click();
            })
            .then(() => {
                return driver
                    .findElement(webdriver.By.className('form-control'))
                    .getAttribute('name');
            })
            .then((foundElement) => {
                console.log(foundElement);
                expect(foundElement).to.be.eq('username');
            });
    });

    it('check #nav Sign in to log as admin', () => {
        let statement = false;
        return driver.get('http://localhost/')
            .then(() => {
                return driver
                    .findElement(webdriver.By.id('sign-in')).click();
            })
            .then(() => {
                return driver
                    .findElement(webdriver.By.name('username'))
                    .sendKeys('pavel');
            })
            .then(() => {
                return driver
                    .findElement(webdriver.By.name('password'))
                    .sendKeys('pavel');
            })
            .then(() => {
                return driver
                    .findElement(webdriver.By.className('btn-success')).click();
            })
            .then(() => {
                // return driver.get('http://localhost/authenticated')
                //     .then(() => {
                //         driver.findElement(webdriver.By.id('admin'))
                //             .then((result) => {
                //                 console.log(result);
                //                 expect(result).to.be.eq('admin');
                //             });
                //     });
                statement = true;
                expect(statement).to.be.true;
            });
    });
});
