const { ObjectID } = require('mongodb');

class BaseMongoDbData {
    constructor(db, ModelClass, validator) {
        this.db = db;
        this.ModelClass = ModelClass;
        this.validator = validator;
        // this.collectionName = this._getCollectionName();
        // this.collection = this.db.collection(this.collectionName);
    }

    getAll() {
        return this.collection.find({}).toArray();
    }

    create(model) {
        if (!this._isModelValid(model)) {
            return Promise.reject('Validation failed!');
        }
        model.shoppinglist = [];
        model.admin = false;
        return this.collection.insert(model)
            .then(() => {
                return model;
            });
    }

    filterBy(props) {
        return this.collection.find(props)
            .toArray();
    }

    findById(id) {
        return this.collection.findOne({
            _id: new ObjectID(id),
        });
    }

    findOrCreateBy(props) {
        return this.collection.filterBy(props)
            .then(([model]) => {
                if (!model) {
                    model = {};
                    return this.collection.insert(model)
                        .then(() => {
                            return model;
                        });
                }

                return model;
            });
    }

    updateById(model) {
        return this.collection.updateOne({
            _id: model._id,
        }, model);
    }

    _isModelValid(model) {
        if ('undefined' === typeof this.validator ||
            'function' !== typeof this.validator.isValid) {
            return true;
        }

        return this.validator.isValid(model);
    }

    // _getCollectionName() {
    //     return this.ModelClass.name.toLowerCase();
    // }
}

module.exports = BaseMongoDbData;

