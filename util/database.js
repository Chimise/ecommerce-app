const {MongoClient, objectId} = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
let _db;


const mongoConnect = (callback) => {
    MongoClient.connect(connectionURL, {useUnifiedTopology: true})
    .then(client => {
        console.log('Connected');
        _db = client.db('ecommerce-app')
        callback();
    })
    .catch(err => {
        console.log(err)
        throw err
    })
}


const getDb = () => {
    if(_db) {
        return _db;
    }

    throw error('No database found')
}

exports.mongoConnect = mongoConnect;

exports.getDb = getDb;