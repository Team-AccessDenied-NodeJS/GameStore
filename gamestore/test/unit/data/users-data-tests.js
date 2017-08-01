const { expect } = require('chai');
const UsersData = require('../../../data/users.data');
const sinon = require('sinon');

describe('UsersData', () => {
    const db = {
        collection: () => { },
    };

    let data = null;

        const ModelClass = class { };

    const validator = null;

    let users = [];

    let find = () => {
        return {
            toArray() {
                return Promise.resolve(users);
            },
        };
    };

    const findOne = (props) => {
        const id = props._id;
        const item = users.find((i) => i.id === id);
        return Promise.resolve(item || null);
    };

    describe('expect getAll()', () => {
        beforeEach(() => {
            sinon.stub(db, 'collection').callsFake(() => {
                return { find };
            });

            data = new UsersData(db, ModelClass, validator);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('to return empty array, when no users', (done) => {
            users = [];
            data.getAll()
                .then((todos) => {
                    expect(todos).to.eql(users);
                    done();
                }
                );
        }
        );
    });


    describe('expect getAll()', () => {
        beforeEach(() => {
            sinon.stub(db, 'collection').callsFake(() => {
                return { find };
            });

            data = new UsersData(db, ModelClass, validator);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('to return same array as provided one', (done) => {
            users = [1, 2, 3, 4];
            data.getAll()
                .then((todos) => {
                    expect(todos).to.eql(users);
                    done();
                }
                );
        }
        );
    });

    describe('expect findById()', () => {
        beforeEach(() => {
            sinon.stub(db, 'collection').callsFake(() => {
                return { findOne };
            });

            data = new UsersData(db);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('to return null, when no users', (done) => {
            const { ObjectID } = require('mongodb');
            const id = new ObjectID().toHexString();
            data.findById(id)
                .then((user) => {
                    expect(user).to.be.eq(null);
                    done();
                });
        });
    });

    describe('expect filterBy()', () => {
        beforeEach(() => {
            users = [
                'Gosho',
                'Pesho',
                'Ivan',
            ];

            find = (property) => {
                return {
                    toArray() {
                        return Promise.resolve(users[property]);
                    },
                };
            };

            sinon.stub(db, 'collection').callsFake(() => {
                return { find };
            });

            data = new UsersData(db);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('to filter by given title', (done) => {
            const props = 1;
            data.filterBy(props)
                .then((result) => {
                    expect(result).to.be.eq('Pesho');
                    done();
                }
                );
        });
    });

    describe('expect updateById()', () => {
        const updateOne = (obekt) => {
            return true;
        };

        beforeEach(() => {
            sinon.stub(db, 'collection').callsFake(() => {
                return { updateOne };
            });

            data = new UsersData(db);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('to do its stuff', (done) => {
            const obekt = {
                _id: 5,
            };

            const result = data.updateById(obekt);
            expect(result).to.be.eq(true);
            done();
        });
    });

    describe('expect isModelValid()', () => {
        const isValid = (model) => {
            return true;
        };

        beforeEach(() => {
            sinon.stub(db, 'validator').callsFake(() => {
                return { isValid };
            });

            data = new UsersData(db, ModelClass, validator);
        });

        it('to take emplty model and return false', (done) => {
            const model = {};
            const result = data._isModelValid(model);
            expect(result).to.be.eq(true);
            done();
        });
    });

    describe('_isModelValid()', () => {
        // const isValid = (model) => {
        //     return true;
        // };

        const isValid = null;

        beforeEach(() => {
            sinon.stub(db, validator).returns(() => {
                sinon.stub(validator, isValid).returns(true);
            });

            data = new UsersData(db, ModelClass, validator);
        });

        it('should take valid model and retun true', (done) => {
            const model = { title: 'Ivan', price: 100 };
            const result = data._isModelValid(model);
            expect(result).to.be.eq(true);
            done();
        });
    });

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
