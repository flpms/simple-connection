'use strict';

let conn = require('../connect-db.js');

let update = function(data, options) {
    let _self = this;

    let promise = new Promise((resolve, reject) => {
        conn(_self.url).then((db) => {
            if (!data) reject('Data not found');

            let cl = db.collection(_self.collectionName);

            let result = (err, result) => {
                db.close();
                (err) ? reject(err): resolve(result);
            };

            cl.update(data, options, result);
        }).catch(err => reject(err));
    });

    return promise;
}

module.exports = update;
