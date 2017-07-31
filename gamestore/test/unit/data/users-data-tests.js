const { expect } = require('chai');
const UsersData = require('../../../data/users.data');
const sinon = require('sinon');

describe('UsersData', () => {
    const db = {
        collection: () => { },
    };

    let data = null;

    describe('expect create()', () => {
        beforeEach(() => {
            const insert = (model) => {
                return {
                    then() {
                        return model;
                    },
                };
            };

            sinon.stub(db, 'collection').callsFake(() => {
                return { insert };
            });

            data = new UsersData(db);
        });

        it('to create new user', (done) => {
            const model = () => {
                return {
                    shoppingList: [],
                    admin: false,
                };
            };

            const result = data.create(model);
            expect(result).to.be.eq(model);
            done();
        });
    });
});
