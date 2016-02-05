'use strict';

let conn = require('../connect-db.js');

let update = function(query, update, options) {
    let _self = this;

    options = (options) ? options : '';

    let promise = new Promise((resolve, reject) => {
        if (!query) {
            reject('Data not found');
            return;
        }

        conn(_self.url).then((db) => {
            let cl = db.collection(_self.collectionName);

            cl.update(query, update, options, (err, result) => {
                db.close();
                (err) ? reject(err): resolve(result);
            });
        }).catch(err => reject(err));
    });

    return promise;
}

module.exports = update;
