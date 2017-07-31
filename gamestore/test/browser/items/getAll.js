/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');

describe('Items routes', () => {
    let driver = null;

    beforeEach(() => {
        driver = setupDriver('firefox');
        // driver = setupDriver('chrome');
    });

    it('check TelerikAcademy.com title', () => {
        return driver.get('https://telerikacademy.com/')
            .then(() => {
                return driver.getTitle();
            })
            .then((title) => {
                console.log(title);
                expect(title).not.to.be.undefined;
            });
    });
});
