'use strict';

const MongoClient = require('mongodb').MongoClient;

class Connections {
  constructor(url) {
    this.url = url;
  }

  createConnection() {
    this.connection = new Promise((resolve, reject) => {
      MongoClient.connect(this.url, (err, db) => { err ? reject(err) : resolve(db) });
    });
  }

  get connection() {
    return this.connection;
  }
}

module.exports = Connections;
