const { expect } = require('chai');
const Controller = require('../../../routers/auth.router/controller');
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

describe('auth  controller tests', () => {
    const data = {
        users: () => {
        },
    };
    data.users = 5;

    let authController = null;
    const request = {
        user: () => {
        },
        games: () => {
        },
        body: () => {
        },
    };
    let req = clone(request);
    const res = {
        render: () => { },
        redirect: () => { },
    };

    describe('expect getAuthenticatedForm()', () => {
        beforeEach(() => {
            req.user = 'pesho';
            req.games = [1, 2];
            sinon.stub(res, 'render').callsFake((str,
                            { user: user,
                              users: users,
                              games: games }) => {
                return Promise.resolve(games);
            });
            authController = Controller.init(data);
        });

        afterEach(() => {
            req = clone(request);
            res.render.restore();
        });

        it('to return array of games', () => {
            authController.getAuthenticatedForm(req, res).then((result) => {
                expect(result).to.be.eql([1, 2]);
            });
        });
    });

    describe('expect getAdminArea()', () => {
        beforeEach(() => {
            req.user = 'pesho';
            sinon.stub(res, 'render').callsFake((str,
                            { user: user }) => {
                return Promise.resolve(user);
            });
            authController = Controller.init(data);
        });

        afterEach(() => {
            req = clone(request);
            res.render.restore();
        });

        it('to return user', () => {
            authController.getAdminArea(req, res).then((result) => {
                expect(result).to.be.eql('pesho');
            });
        });
    });

    describe('expect getSignUpForm()', () => {
        beforeEach(() => {
            req.user = 'pesho';
            sinon.stub(res, 'render').callsFake(() => {
                return Promise.resolve(5);
            });
            authController = Controller.init(data);
        });

        afterEach(() => {
            req = clone(request);
            res.render.restore();
        });

        it('to return res.render()', () => {
            authController.getSignUpForm(req, res).then((result) => {
                expect(result).to.be.eql(5);
            });
        });
    });

    describe('expect getSignInForm()', () => {
        beforeEach(() => {
            req.user = 'pesho';
            sinon.stub(res, 'render').callsFake(() => {
                return Promise.resolve(5);
            });
            authController = Controller.init(data);
        });

        afterEach(() => {
            req = clone(request);
            res.render.restore();
        });

        it('to return res.render()', () => {
            authController.getSignInForm(req, res).then((result) => {
                expect(result).to.be.eql(5);
            });
        });
    });

    describe('expect signUp()', () => {
        beforeEach(() => {
            req.body = { password: '1234', username: 'pesho' };
            req.games = [1, 2];
            sinon.stub(res, 'redirect').callsFake(() => {
                return Promise.resolve(5);
            });
            authController = Controller.init(data);
        });

        afterEach(() => {
            req = clone(request);
            res.redirect.restore();
        });

        it('to call res.redirect() when password or usernami is not valid', () => {
            authController.signUp(req, res).then((result) => {
                expect(result).to.be.eql(5);
            });
        });
    });
});
