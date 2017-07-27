const BaseData = require('./base/base.data');
const User = require('../models/user.model');

class UsersData extends BaseData {
    constructor(db) {
        super(db, User, User);
        this.collection = this.db.collection('users');
        this.shoppinglist = [];
        this.isAdmin = false;
    }

    findByUsername(username) {
        return this
            .filterBy({ username: new RegExp(username, 'i') })
            .then(([user]) => user);
    }

    checkPassword(username, password) {
        return this.findByUsername(username)
            .then((user) => {
                if (!user) {
                    throw new Error('Invalid user');
                }

                if (user.password !== password) {
                    throw new Error('Invalid password');
                }

                return true;
            });
    }

    addToShoppingList(game) {
        this.shoppinglist.push(game);
    }

    getShoppingList() {
        return this.shoppinglist;
    }

    setAdmin(role) {
        this.isAdmin = role;
    }

    getUserRole() {
        return this.isAdmin;
    }
}

module.exports = UsersData;
