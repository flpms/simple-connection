'use strict';
const fs = require('fs');
const mongoClient = require('mongodb').MongoClient;

let Collection = function(collectionName, config) {

    if (!Object.keys(config).length) {
        throw 'Don\'t have a DB config';
    }

    let url = `mongodb://${config.server}:${config.port}/${config.database_name}`;

    let connect = function() {

        let promise = new Promise((resolve, reject) => {
            mongoClient.connect(url, (err, db) => {
                (err) ? reject(err) : resolve(db);
            });
        });

        return promise;
    };

    let insert = function(data) {
        let promise = new Promise((resolve, reject) => {
            connect().then((db) => {

                let cl = db.collection(collectionName);

                if (!data) reject('Data not found');

                cl.insert(data, (err, result) => {

                    db.close();

                    if (err) {
                        reject(err);
                    }

                    resolve(result);
                });
            }).catch(err => reject(err));
        });

        return promise;
    };

    let find = function(data) {
        let promise = new Promise((resolve, reject) => {

            connect().then((db) => {

                let cl = db.collection(collectionName);

                cl.find(data).toArray((err, docs) => {

                    if (err) {
                        reject(err);
                    }

                    db.close();

                    resolve(docs);
                });
            }).catch((err) => {
                console.log(err);
                reject(err);
            });
        });

        return promise;
    };

    let remove = function() {
    };

    let update = function() {
    };

    return {
        insert: insert,
        find: find,
        remove: remove,
        update: update
    }
};

module.exports = function(config) {
    return {
        collection: function(collectionName) {
            return (Collection(collectionName, config));
        }
    }
}
