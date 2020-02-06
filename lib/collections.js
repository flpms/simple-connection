'use strict'; 

class Collections {
  constructor(connect) {
    this.connection = connect;
    this.use.bind(this);
    return this;
  }
  
  use(collection) {
    return this.connection.then(db => db.collection(collection));
  }
}

module.exports = Collections;