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

  insert(data, options) {
    return this.createPromise((resolve, reject) => {
      if (this.checkForData(data)) {
        reject('No data to insert');
      }

      this.connection
          .then((db) => {
            return {
              col: this.retriveCollection(db),
              db: db
            }
          })
          .then((op) => {
            const result = (err, result) => {
              op.db.close();
              return err ? reject(err): resolve(result);
            };

            if (Array.isArray(data)) {
              return op.col.insertMany(data, options, result);
            }

            return op.col.insert(data, options, result);
          });
        });
  }

  find(data, projection) {
    return this.createPromise((resolve, reject) => {
      if (this.checkForData(data)) {
        return reject('No data to find');
      }

      this.connection.then((db) => {
        return {
          col: this.retriveCollection(db),
          db: db
        };
      }).then((op) => {
        op.col
          .find(data, (projection) ? projection : '')
          .toArray((err, docs) => {
            op.db.close();
            return err ? reject(err) : resolve(docs);
          });
      });
    });
  }

  remove(data, options) {
    return this.createPromise((resolve, reject) => {
      if (this.checkForData(data)) {
        return reject('No data to remove');
      }

      this.retriveCollection(db)
          .remove(data, options, (err, result) => {
            db.close();
            (err) ? reject(err): resolve(result);
          });
    });
  }

  update(data, options) {
    return this.createPromise(() => {
      if (this.checkForData(data)) {
        return reject('No data to update');
      }

      this.retriveCollection(db)
          .update(query, update, options, (err, result) => {
            db.close();
            (err) ? reject(err): resolve(result);
          });
    });
  }
}

module.exports = Operations;
