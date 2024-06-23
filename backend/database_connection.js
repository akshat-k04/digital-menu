//connecting with the mongo database
const mongoose = require('mongoose');

function connect_to_mongo() {
    const link = process.env.MONGO_DB_LINK;
    mongoose.connect(link)
        .then(function () {
            console.log('db connected');

        })
        .catch(function (err) {
            console.log(err);
        });
}

module.exports = connect_to_mongo;
