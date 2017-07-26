const BaseData = require('./base/base.data');
const Game = require('../models/game.model');

class GamesData extends BaseData {
    constructor(db) {
        super(db, Game, Game);

        this.collection = this.db.collection('gamestores');
    }

    filterBy(props) {
        return this.collection.find(props).toArray();
    }

    _isModelValid(model) {
        // custom validation 
        return super._isModelValid(model);
    }
}

module.exports = GamesData;
