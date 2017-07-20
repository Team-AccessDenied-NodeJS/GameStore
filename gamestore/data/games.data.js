const BaseData = require('./base/base.data');
const Game = require('../models/game.model');

class GamesData extends BaseData {
    constructor(db) {
        super(db, Game, Game);
    }

    _isModelValid(model) {
        // custom validation 
        return super._isModelValid(model);
    }
}

module.exports = GamesData;
