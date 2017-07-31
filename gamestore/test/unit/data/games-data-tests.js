const { expect } = require('chai');
const GamesData = require('../../../data/games.data');
const sinon = require('sinon');

describe('GamesData', () => {
    const db = {
        collection: () => { },
    };

    let data = null;

    const ModelClass = class { };

    let validator = null;

    let games = [];

    let find = () => {
        return {
            toArray() {
                return Promise.resolve(games);
            },
        };
    };

    const findOne = (props) => {
        const id = props._id;
        const item = games.find((i) => i.id === id);
        return Promise.resolve(item || null);
    };

    describe('expect getAll()', () => {
        beforeEach(() => {
            sinon.stub(db, 'collection').callsFake(() => {
                return { find };
            });

            data = new GamesData(db, ModelClass, validator);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('to return empty array, when no games', (done) => {
            games = [];
            data.getAll()
                .then((todos) => {
                    expect(todos).to.eql(games);
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

            data = new GamesData(db, ModelClass, validator);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('to return same array as provided one', (done) => {
            games = [1, 2, 3, 4];
            data.getAll()
                .then((todos) => {
                    expect(todos).to.eql(games);
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

            data = new GamesData(db);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('to return null, when no games', (done) => {
            const { ObjectID } = require('mongodb');
            const id = new ObjectID().toHexString();
            data.findById(id)
                .then((game) => {
                    expect(game).to.be.eq(null);
                    done();
                });
        });
    });

    describe('expect filterBy()', () => {
        beforeEach(() => {
            games = [
                'Batman',
                'Robin',
                'Two fases',
            ];

            find = (property) => {
                return {
                    toArray() {
                        return Promise.resolve(games[property]);
                    },
                };
            };

            sinon.stub(db, 'collection').callsFake(() => {
                return { find };
            });

            data = new GamesData(db);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('to filter by given title', (done) => {
            const props = 1;
            data.filterBy(props)
                .then((result) => {
                    expect(result).to.be.eq('Robin');
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

            data = new GamesData(db);
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

            data = new GamesData(db, ModelClass, validator);
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

            data = new GamesData(db, ModelClass, validator);
        });

        it('should take valid model and retun true', (done) => {
            const model = { title: 'Ivan', price: 100 };
            const result = data._isModelValid(model);
            expect(result).to.be.eq(true);
            done();
        });
    });
});
