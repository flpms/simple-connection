'use strict';

let conn = require('../connect-db.js');

let find = function(data, projection) {

    let _self = this;

    let promise = new Promise((resolve, reject) => {
        conn(_self.url).then((db) => {
            let cl = db.collection(_self.collectionName);
            cl.find(data, (projection) ? projection : '').toArray((err, docs) => {
                db.close();
                (err) ? reject(err) : resolve(docs);
            });
        }).catch((err) => {
            reject(err);
        });
    });

    return promise;
}

module.exports = find;
