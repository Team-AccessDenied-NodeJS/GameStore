const { expect } = require('chai');
const Controller = require('../../../routers/shoppingcart.router/controller');
const sinon = require('sinon');

function clone(obj) {
      if (obj === null || typeof(obj) !== 'object' || 'isActiveClone' in obj) {
        return obj;
        }
        const temp = obj.constructor();
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          obj.isActiveClone = null;
          temp[key] = clone(obj[key]);
          delete obj.isActiveClone;
        }
      }

      return temp;
    }

describe('shopping cart controller tests', () => {
    const data = {
        users: () => {
            return {
                updateById() {
                    return Promise.resolve(true);
                },
            };
        },
    };
    data.users.updateById = () => {};

    let shoppingcartController = null;
    const request = {
        user: () => {
            return {
                shoppinglist() {
                    return Promise.resolve([1, 2, 3, 4]);
                },
            };
        },
        body: () => {
            return {
                game() {
                    return Promise.resolve(2);
                },
            };
        },
    };
    let req = clone(request);
    const res = {
        render: () => { },
        redirect: () => { },
    };

    const controller = {
        getSignInForm: () => { },
    };

    describe('expect getShoppingCart()', () => {
        beforeEach(() => {
            req.user = false;
            sinon.stub(controller, 'getSignInForm').callsFake(() => {
                return Promise.resolve(1);
            });
            shoppingcartController = Controller.init(data, controller);
        });

        afterEach(() => {
            req = clone(request);
            controller.getSignInForm.restore();
        });

        it('to call .controller.getSignInForm(req, res) when there is no user', () => {
            shoppingcartController.getShoppingCart(req, res).then((result) => {
                expect(result).to.be.eql(1);
            });
        });
    });

    describe('expect getShoppingCart()', () => {
        beforeEach(() => {
            req.user.shoppinglist = [1, 2, 3, 4];
            sinon.stub(res, 'render').callsFake((str, { user: user, list: array }) => {
                return Promise.resolve(array);
            });
            sinon.stub(controller, 'getSignInForm').callsFake(() => {
                return Promise.resolve(1);
            });
            shoppingcartController = Controller.init(data, controller);
        });

        afterEach(() => {
            req = clone(request);
            res.render.restore();
            controller.getSignInForm.restore();
        });

        it('to call .res.render(shopping-cart,{ user: req.user, list: array } when there is user', () => {
            shoppingcartController.getShoppingCart(req, res).then((result) => {
                expect(result).to.be.eql([1, 2, 3, 4]);
            });
        });
    });

    describe('expect addToCart()', () => {
        beforeEach(() => {
            req.user = false;
            sinon.stub(controller, 'getSignInForm').callsFake(() => {
                return Promise.resolve(1);
            });
            shoppingcartController = Controller.init(data, controller);
        });

        afterEach(() => {
            req = clone(request);
            controller.getSignInForm.restore();
        });

        it('to call .controller.getSignInForm(req, res) when there is no user', () => {
            shoppingcartController.addToCart(req, res).then((result) => {
                expect(result).to.be.eql(1);
            });
        });
    });

    describe('expect addToCart()', () => {
        beforeEach(() => {
            req.body.game = 5;
            req.user.shoppinglist = [];
            
            sinon.stub(res, 'redirect').callsFake(() => {
                return Promise.resolve(6);
            });
            shoppingcartController = Controller.init(data, controller);
        });

        afterEach(() => {
            req = clone(request);
            res.redirect.restore();
        });

        it('to call .res.redirect(/games) when there is user', () => {
            shoppingcartController.addToCart(req, res).then((result) => {
                expect(result).to.be.eql(6);
            });
        });
    });

    describe('expect buy()', () => {
        beforeEach(() => {
            req.user = false;
            sinon.stub(controller, 'getSignInForm').callsFake(() => {
                return Promise.resolve(1);
            });
            shoppingcartController = Controller.init(data, controller);
        });

        afterEach(() => {
            req = clone(request);
            controller.getSignInForm.restore();
        });

        it('to call .controller.addToCart(req, res) when there is no user', () => {
            shoppingcartController.buy(req, res).then((result) => {
                expect(result).to.be.eql(1);
            });
        });
    });

    describe('expect buy()', () => {
        beforeEach(() => {
            req.body.game = 2;
            req.user.shoppinglist = [1, 2, 3];
            
            sinon.stub(res, 'redirect').callsFake(() => {
                return Promise.resolve(6);
            });
            shoppingcartController = Controller.init(data, controller);
        });

        afterEach(() => {
            req = clone(request);
            res.redirect.restore();
        });

        it('to call .res.redirect(/games) when there is user', () => {
            shoppingcartController.addToCart(req, res).then((result) => {
                expect(result).to.be.eql(6);
            });
        });
    });
});
