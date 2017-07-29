const { expect } = require('chai');
const BaseMongoDbData = require('../gamestore/data/base/base.data');
const sinon = require('sinon');

describe('BaseMongoDbData', () => {
    const db = {
        collection: () => { },
    };

    let data = null;

    const ModelClass = class {};

    const validator = null;

    let items = [];

    const find = () => {
        return {
            toArray() {
                return Promise.resolve(this.items);
            },
        };
    };

    const findOne = (props) => {
        const id = props._id;
        const item = items.find((i) => i.id === id);
        return Promise.resolve(item || null);
    };

    describe('expect getAll()', () => {
        beforeEach(() => {
            sinon.stub(db, 'collection').callsFake(() => {
                return { find };
            });

            data = new BaseMongoDbData(db, ModelClass, validator);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('to return empty array, when no todos', () => {
            items = [];
            data.getAll().then((result) => {
                expect(result).to.be.eql(items);
            });
        });
    });

    describe('expect getById()', () => {
        beforeEach(() => {
            sinon.stub(db, 'collection').callsFake(() => {
                return { findOne };
            });

            data = new BaseMongoDbData(db);
        });

        afterEach(() => {
            db.collection.restore();
        });

        it('to return null, when no todos', (done) => {
            const { ObjectID } = require('mongodb');
            const id = new ObjectID().toHexString();
            data.findById(id)
                .then((item) => {
                    expect(item).to.be.null;
                    done();
                });
        });
    });
});
