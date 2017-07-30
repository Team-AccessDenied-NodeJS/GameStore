const { expect } = require('chai');
const Controller = require('../../../routers/admin.router/controller');
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

describe('admin controller tests', () => {
    const data = {
        games: () => {
            return {
                collection: () => {
                    return {
                        insert() {
                        },
                    };
                },
            };
        },
    };
    data.games.collection = () => {
        return {
            insert: {},
        };
    };
    data.games.collection.insert = () => { };

    let adminController = null;
    const request = {
        user: () => {
            return {
                admin() {
                },
            };
        },
        games: () => {
        },
        body: () => {
            return {
                title() {
                },
                image() {
                },
                price() {
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

    describe('expect getAdminGames()', () => {
        beforeEach(() => {
            req.user = false;
            sinon.stub(controller, 'getSignInForm').callsFake(() => {
                return Promise.resolve(1);
            });
            adminController = Controller.init(data, controller);
        });

        afterEach(() => {
            req = clone(request);
            controller.getSignInForm.restore();
        });

        it('to call controller.getSignInForm when there is no user', () => {
            adminController.getAdminGames(req, res).then((result) => {
                expect(result).to.be.eql(1);
            });
        });
    });

    describe('expect getAdminGames()', () => {
        beforeEach(() => {
            req.user.admin = true;
            req.games = [1, 2, 3];
            sinon.stub(res, 'render').callsFake((str,
                            { user: user, games: games }) => {
                return Promise.resolve(games);
            });
            adminController = Controller.init(data, controller);
        });

        afterEach(() => {
            req = clone(request);
            res.render.restore();
        });

        it('to return array of games when there is user', () => {
            adminController.getAdminGames(req, res).then((result) => {
                expect(result).to.be.eql([1, 2, 3]);
            });
        });
    });

    describe('expect addGame()', () => {
        beforeEach(() => {
            req.user = false;
            sinon.stub(controller, 'getSignInForm').callsFake(() => {
                return Promise.resolve(1);
            });
            adminController = Controller.init(data, controller);
        });

        afterEach(() => {
            req = clone(request);
            controller.getSignInForm.restore();
        });

        it('to call controller.getSignInForm when there is no user', () => {
            adminController.addGame(req, res).then((result) => {
                expect(result).to.be.eql(1);
            });
        });
    });

    describe('expect addGame()', () => {
        beforeEach(() => {
            req.user.admin = true;
            req.body.title = 'title';
            req.body.image = 5;
            req.body.price = 8;
            sinon.stub(res, 'redirect').callsFake(() => {
                return Promise.resolve(5);
            });
            adminController = Controller.init(data, controller);
        });

        afterEach(() => {
            req = clone(request);
            res.redirect.restore();
        });

        it('to call res.redirect when there is user', () => {
            adminController.addGame(req, res).then((result) => {
                expect(result).to.be.eql(5);
            });
        });
    });

    describe('expect getAdminUsers()', () => {
        beforeEach(() => {
            req.user = false;
            sinon.stub(controller, 'getSignInForm').callsFake(() => {
                return Promise.resolve(1);
            });
            adminController = Controller.init(data, controller);
        });

        afterEach(() => {
            req = clone(request);
            controller.getSignInForm.restore();
        });

        it('to call controller.getSignInForm when there is no user', () => {
            adminController.getAdminUsers(req, res).then((result) => {
                expect(result).to.be.eql(1);
            });
        });
    });
});
