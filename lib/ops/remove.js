'use strict';

let conn = require('../connect-db.js');

let remove = function(data, options) {
    let _self = this;

    let promise = new Promise((resolve, reject) => {
        if (!data) {
            reject('Data not found');
            return;
        }

        conn(_self.url).then((db) => {
            let cl = db.collection(_self.collectionName);
            cl.remove(data, options, (err, result) => {
                db.close();
                (err) ? reject(err): resolve(result);
            });
        }).catch((err) => reject(err));
    });

    return promise;
}

module.exports = remove;
