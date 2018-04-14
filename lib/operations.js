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

  insert(data, options) {
    return this.createPromise((resolve, reject) => {
      if (!data || !Object.keys(data).length) return reject('No data to insert');

      return this.connection.then((db) => {
        const result = (err, result) => {
            db.close();
            return err ? reject(err): resolve(result);
        };

        let _collection = this.retriveCollection(db);

        if (Array.isArray(data)) {
            return _collection.insertMany(data, options, result);
        }

        return _collection.insert(data, options, result);
      });
    });
  }

  find(data, projection) {
    return this.createPromise((resolve, reject) => {
      if (!data || !Object.keys(data).length) return reject('No data to find');

      return this.connection.then((db) => {
        this.retriveCollection(db)
            .find(data, (projection) ? projection : '')
            .toArray((err, docs) => {
              db.close();
              return err ? reject(err) : resolve(docs);
            });
      });
    });
  }

  remove(data, options) {
    return this.createPromise((resolve, reject) => {
      if (!data || !Object.keys(data).length) return reject('No data to remove');

      this.retriveCollection(db)
          .remove(data, options, (err, result) => {
            db.close();
            (err) ? reject(err): resolve(result);
      });
    });
  }

  update(data, options) {
    return this.createPromise(() => {
      if (!data || !Object.keys(data).length) return reject('No data to update');

      this.retriveCollection(db)
          .update(query, update, options, (err, result) => {
            db.close();
            (err) ? reject(err): resolve(result);
      });
    });
  }
}

module.exports = Operations;
