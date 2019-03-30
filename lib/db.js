'use strict';

const MongoClient = require('mongodb').MongoClient;
const operations = require('./operations');

class DB {

  constructor(config) {
    if (!config) {
      throw new Error('connection configuration not defined');
    }

    const userAndPass = (username, password) => {
      if(username && password) {
        return `${username}:${password}@`;
      }

      if(username) {
        return `${username}@`;
      }

      return '';
    };

    this.url = `mongodb://${userAndPass(config.username, config.password)}${config.server}:${config.port}/${config.database_name}${(config.query_params || '')}`;

    this.config = config;

    if (!this.validConfig) {
      throw new Error('invalid connection configuration json');
    }

    return this;
  }

  open(collectionName, Operations = operations) {
    return new Operations(collectionName, MongoClient.connect(this.url));
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
