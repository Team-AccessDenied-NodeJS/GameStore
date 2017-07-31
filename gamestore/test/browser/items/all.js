/* eslint-disable no-unused-expressions */

const { expect } = require('chai');
const { setupDriver } = require('../utils/setup-driver');
const ui = require('../utils/ui-utils');
const todoUtils = require('../utils/todo.utils');

const async = () => {
  return Promise.resolve();
};

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

    describe('expect todos to be listed', () => {
        it('when they are created', () => {
            const length = 5;
            const texts = Array.from({ length })
                .map((_, index) => 'Todo ' + (index + 1));

            return async()
                .then(() => {
                    return texts.reduce((p, text) => {
                        return p.then(() =>
                            todoUtils.createTODO(text));
                    }, async());
                })
                .then(() => ui.click('#nav-todos .toggle'))
                .then(() => ui.click('#nav-todos-all'))
                .then(() => ui.getTexts('.todo-item'))
                .then((elTexts) => {
                    texts.forEach((text) => {
                        expect(elTexts).to.include(text);
                    });
                });
        });
});
});
