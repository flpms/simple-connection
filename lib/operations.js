'use strict';

class Operations {

  constructor(ctx) {
    this.connection = ctx.connection;
    this.collectionName = ctx.collectionName;
  }

  private createPromise(cb) {
    return new Promise(cb);
  }

  private retriveCollection(db) {
    return db.collection(this.collectionName);
  }

  public insert(data, options) {
    return this.createPromise((resolve, reject) => {
      if (!data || Object.keys(data).length) return reject('No data to insert');

      return this.connection.then((db) => {
        const result = (err, result) => {
            db.close();
            return err ? reject(err): resolve(result);
        };

        if (Array.isArray(data)) {
            return this.retriveCollection(db).insertMany(data, options, result);
        }

        return this.retriveCollection(db).insert(data, options, result);
      });
    });
  }

  find(data, projection) {
    return this.createPromise((resolve, reject) => {
      if (!data || Object.keys(data).length) return reject('No data to find');

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
      if (!data || Object.keys(data).length) return reject('No data to remove');

      this.retriveCollection(db).remove(data, options, (err, result) => {
          db.close();
          (err) ? reject(err): resolve(result);
      });
    });
  }

  update(data, options) {
    return this.createPromise(() => {
      if (!data || Object.keys(data).length) return reject('No data to update');

      this.retriveCollection(db).update(query, update, options, (err, result) => {
          db.close();
          (err) ? reject(err): resolve(result);
      });
    });
  }
}

module.exports = Operations;
