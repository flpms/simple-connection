'use strict';

const insert = require('./insert.js');
const find = require('./find.js');
const remove = require('./remove.js');
const update = require('./update.js');

module.exports = {
    insert: insert,
    find: find,
    remove: remove,
    update:update
};
