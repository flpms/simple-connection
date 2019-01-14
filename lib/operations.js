'use strict';

class Operations {

  constructor(collectionName, connection) {
    this.connection = connection;
    this.collectionName = collectionName;
  }

  createPromise(cb) {
    return new Promise(cb);
  }

  retriveCollection(db) {
    return db.collection(this.collectionName);
  }

  checkForData(data) {
    return !data || !Object.keys(data).length;
  }

  startOperations() {
    return this.connection.then((db) => {
      return this.createOperationObject.call(this, db);
    });
  }

  createOperationObject(db) {
    return {
      collection: this.retriveCollection(db),
      db: db
    }
  }

  insert(data, options) {
    return this.createPromise((resolve, reject) => {
      if (this.checkForData(data)) {
        reject('No data to insert');
      }

      const operations = this.startOperations();

      operations.then((op) => {
        const result = (err, result) => {
          op.db.close();
          return err ? reject(err): resolve(result);
        };

        if (Array.isArray(data)) {
          return op.collection.insertMany(data, options, result);
        }

        op.collection.insert(data, options, result);
      }).catch(reject);
    });
  }

  find(data, projection) {
    return this.createPromise((resolve, reject) => {
      if (this.checkForData(data)) {
        return reject('No data to find');
      }

      const operations = this.startOperations();

      operations.then((op) => {
        op.collection
          .find(data, (projection) ? projection : '')
          .toArray((err, docs) => {
            op.db.close();
            return err ? reject(err) : resolve(docs);
          });
      }).catch(reject);
    });
  }

  remove(data, options) {
    return this.createPromise((resolve, reject) => {
      if (this.checkForData(data)) {
        return reject('No data to remove');
      }

      const operations = this.startOperations();

      operations.then((op) => {
        op.collection
          .remove(data, options, (err, result) => {
            op.db.close();
            (err) ? reject(err): resolve(result);
          });
      }).catch(reject);
    });
  }

  update(query, update, options) {
    return this.createPromise((resolve, reject) => {
      if (this.checkForData(query)) {
        return reject('No query to looking for');
      }

      if (this.checkForData(update)) {
        return reject('No data to update');
      }

      const operations = this.startOperations();

      operations.then((op) => {
        op.collection
          .update(query, update, options, (err, result) => {
            op.db.close();
            (err) ? reject(err): resolve(result);
          });
      }).catch(reject);
    });
  }
}

module.exports = Operations;
