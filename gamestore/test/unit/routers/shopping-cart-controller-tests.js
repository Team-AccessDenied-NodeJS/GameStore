const { expect } = require('chai');
const Controller = require('../../../routers/shoppingcart.router/controller');
const sinon = require('sinon');

describe('shopping cart controller tests', () => {
    const db = {
        collection: () => { },
    };


    let shoppingcartController = null;
    const req = {
        user: () => {
            return {
                shoppinglist() {
                    return Promise.resolve([1, 2, 3, 4]);
                },
            };
        },
    };
    const res = {
        render: () => { },
    };

    const controller = {
        getSignInForm: () => { },
    };
    describe('expect getShoppingCart()', () => {
        beforeEach(() => {
            sinon.stub(req, 'user').callsFake(() => {
                return Promise.resolve(false);
            });
            sinon.stub(controller, 'getSignInForm').callsFake(() => {
                return Promise.resolve(1);
            });
            shoppingcartController = Controller.init(db, controller);
        });

        afterEach(() => {
            req.user.restore();
            controller.getSignInForm.restore();
        });

        it('to call .controller.getSignInForm(req, res) when there is no user', () => {
            shoppingcartController.controller.getSignInForm(req, res).then((result) => {
                expect(result).to.be.eql(1);
            });
        });
    });

    describe('expect getShoppingCart()', () => {
        beforeEach(() => {
            sinon.stub(req, 'user').callsFake(() => {
                return Promise.resolve(true);
            });
            sinon.stub(res, 'render').callsFake((str, { user: user, list: array }) => {
                return Promise.resolve(array);
            });
            sinon.stub(controller, 'getSignInForm').callsFake(() => {
                return Promise.resolve(1);
            });
            shoppingcartController = Controller.init(db, controller);
        });

        afterEach(() => {
            req.user.restore();
            res.render.restore();
            controller.getSignInForm.restore();
        });

        it('to call .res.render(shopping-cart,{ user: req.user, list: array } when there is user', () => {
            shoppingcartController.controller.getSignInForm(req, res).then((result) => {
                expect(result).to.be.eql([1, 2, 3, 4]);
            });
        });
    });
});
