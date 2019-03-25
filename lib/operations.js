'use strict';

class Operations {

  constructor(collectionName, connect) {
    this.collection = connect.then(db => {
      this.db = db;
      return db.collection(collectionName);
    });

    return this.operation.bind(this);
  }

  operation() {
    if (!arguments.length) {
      throw new Error(`You must call like the following arguments
        operation('find', { your: 'search' })
      `);
    }

    const operationType = arguments[0];
    const params = Array.from(arguments).filter((item, i) => i !== 0);

    return this.collection.then(col => {
      const op = col[operationType].apply(col, params);

      if (operationType === 'find') {
        return {
          close: this.db.close.bind(this.db),
          find: op
        }
      }

      return op.then((result) => {
        this.db.close();
        return result;
      });
    });
  }
}

module.exports = Operations;
