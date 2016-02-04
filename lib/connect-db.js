'use strict';

const MongoClient = require('mongodb').MongoClient;

const connectDB =  function(url) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, db) => { err ? reject(err) : resolve(db) });
    });
}

module.exports = connectDB;
