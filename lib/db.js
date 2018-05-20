'use strict';

const Connections = require('./connections');
const Collections = require('./collections');

class DB extends Connections {
  constructor(config) {
    if (!config) {
      throw new Error('connection configuration not defined');
    }

    const userAndPass = `${config.username}:${config.password}@`;
    const url = `mongodb://${userAndPass}${config.server}:${config.port}/${config.database_name}`;

    super(url);

    this.config = config;

    if (!this.validConfig) {
      throw new Error('invalid connection configuration json');
    }

    return this;
  }

  open(collectionName) {
    super.createConnection();
    return new Collections(collectionName, super.connection);
  }

  get validConfig() {
    if (this.config.hasOwnProperty('server') &&
        this.config.hasOwnProperty('port') &&
        this.config.hasOwnProperty('database_name')) {
          return true;
      }
  }
}

module.exports = DB;
