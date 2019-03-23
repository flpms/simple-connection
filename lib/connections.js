'use strict';

const MongoClient = require('mongodb').MongoClient;

class Connections {
  constructor(url) {
    this.url = url;
  }

  createConnection() {
    this._connection = MongoClient.connect(this.url);
  }

  get connection() {
    return this._connection;
  }
}

module.exports = Connections;
