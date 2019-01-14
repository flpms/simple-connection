'use strict';

const assert = require('assert');
const expect = require('chai').expect;
const sinon = require('sinon');

const DB = require('./../lib/db.js');

describe('Test integration with mongo db', () => {

  let db, collection;

  const CONFIG = {
    "username": "root",
    "password": "",
    "server": "127.0.0.1",
    "port": 27017,
    "database_name": "exampleTest"
  };

  beforeEach(() => {
    db = new DB(CONFIG);
    collection = db.open('exampleCollection');
  });

  context('insert data', () => {
    it('expect create data', (done) => {
      collection.insert({filipe: 'silva'}).then((ops) => {

        expect(ops.result).to.be.a('object');
        expect(ops.result).to.have.property('ok');
        expect(ops.result.ok).to.be.equal(1);

        done();
      });
    });
  });

  context('read data', () => {
    it('expect retrive data', (done) => {
      collection.find({ filipe: 'silva' }).then((ops) => {
        expect(ops).to.be.a('array');
        done();
      });
    });
  });

  context('update data', () => {
    let item;

    beforeEach(() => {
      collection.find({ filipe: 'silva' }).then((ops) => {
        item = ops[0];
      });
    })

    it('expect retrive data', (done) => {
      collection.update(item, { filipe: 'melo' }).then((ops) => {
        console.log('= = = ', ops);
        // expect(ops).to.be.a('array');
        done();
      }).catch((er) => {
        console.log('!!! ', er);
        done();
      });
    });
  });

});
