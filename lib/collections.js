'use strict';

const Operations = require('./operations');

class Collections extends Operations {
  constructor(collectionName, dbConnection) {
    return super(collectionName, dbConnection);
  }
}

module.exports = Collections;
