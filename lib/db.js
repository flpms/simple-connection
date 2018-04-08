'use strict';

const Connections = require('./connections');
const Collections = require('./collections');

class DB extends Connections {
  constructor(config) {
    if (!Object.keys(config).length) {
        throw 'Don\'t have a DB config';
    }

    super(`mongodb://${config.server}:${config.port}/${config.database_name}`);
  }

  open(collectionName) {
    super.createConnection();
    return new Collections(collectionName, super.connection);
  }
}

module.exports = DB;
