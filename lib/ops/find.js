'use strict';

let conn = require('../connect-db.js');

let find = function() {

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
}

module.exports = find;
