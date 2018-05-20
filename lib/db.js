'use strict';

const Connections = require('./connections');
const Collections = require('./collections');

class DB extends Connections {
  constructor(config) {
    let userAndPass;

    this.config = config;

    if (!this.isValidConfig(config)) {
      throw 'invalid connection configuration json'
    }

    super(`mongodb://${this.userAndPass}${config.server}:${config.port}/${config.database_name}`);
    return this;
  }

  open(collectionName) {
    super.createConnection();
    return new Collections(collectionName, super.connection);
  }

  get isValidConfig(config) {
    if (config.hasOwnProperty('server') &&
        config.hasOwnProperty('port') &&
        config.hasOwnProperty('database_name')) {
          return true;
      }
  }

  get userAndPass() {
    if (!this.config.hasOwnProperty('username') &&
        !this.config.hasOwnProperty('password')) return '';

    return `${this.config.username}:${this.config.password}@`;
  }
}

module.exports = DB;
