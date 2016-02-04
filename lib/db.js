'use strict';

const ops = require('./ops');

let Collection = function(collectionName, config) {

    if (!Object.keys(config).length) {
        throw 'Don\'t have a DB config';
    }

    let url = `mongodb://${config.server}:${config.port}/${config.database_name}`;

    return {
        insert: (data) => {
            return ops.insert.call(data, { url: url, collectionName: collectionName });
        },
        find: (data) => {
            return ops.find.call(data, { url: url, collectionName: collectionName });
        },
        remove: (data, options) => {
            return ops.remove.apply({ url: url, collectionName: collectionName }, [data, options]);
        },
        update: (data) => {
            return ops.update.apply({ url: url, collectionName: collectionName }, [data, options]);
        }
    };
};

module.exports = (config) => {
    return {
        collection: (collectionName) => {
            return (Collection(collectionName, config));
        }
    }
}
