'use strict';

const MongoClient = require('mongodb').MongoClient;

class Connections {
  constructor(url) {
    this.url = url;
  }

  createConnection() {
    this._connection = new Promise((resolve, reject) => {
      MongoClient.connect(this.url, (err, db) => { err ? reject(err) : resolve(db) });
    });
  }

  get connection() {
    return this._connection;
  }
}

module.exports = Connections;
