class DataBase {
    constructor(db) {
        this.db = db;
        this.collection = this.db.collection('gamestore');
    }

    filterBy(props) {
        return this.collection.find(props).toArray();
    }

    getAll() {
            return this.collection.find().toArray()
                .then((res)=> {
                    return res;
                });
    }
}


module.exports = DataBase;
