'use strict';

const Operations = require('./ops');

class Collections extends Operations {
  constructor(collectionName, dbconnection) {
    this.collectionName = collectionName;
    this.connection = dbconnection;

    return super(this);
  }

}

module.exports = Collections;
