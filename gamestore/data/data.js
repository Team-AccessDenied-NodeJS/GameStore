let collection;

const init = (db) => {
    const gamestore = db.collection('gamestore');

    return function getAll() {
        collection = db.collection('gamestore').find().toArray();
        // console.log(collection);
        return collection;
    };

    // function createGame(title, price, image, description) {
    //     console.log(gamestore);
    //     gamestore.insert({
    //         title: title,
    //         price: price,
    //         image: image,
    //         description: description,
    //     });
    // }

    // gamestore.insert({
    //     title: 'Awesame GAME',
    //     price: '2000',
    //     image: 'https://pbs.twimg.com/profile_images/816215321967214592/8he4-b7U.jpg',
    //     description: 'description',
    // });
};

module.exports = { init };
