'use strict';

const expect = require('chai').expect;

const DB = require('./../lib/db.js');

describe('Test integration with mongo db', () => {

  let db, collection;

  const CONFIG = {
    "server": "localhost",
    "port": 27017,
    "database_name": "mydb_test"
  };

  beforeEach(() => {
    db = new DB(CONFIG);

    collection = db.open('exampleCollection');
  });

  context('insert data', () => {
    it('expect create data', (done) => {
      collection('insert', { name: 'filipe silva' })
                .then((ops) => {

                  expect(ops.result).to.be.a('object');
                  expect(ops.result).to.have.property('ok');
                  expect(ops.result.ok).to.be.equal(1);

                  done();
                }).catch(done);
    });

    it('expect multiple data', (done) => {
      collection('insertMany', [
        { name: 'filipe silva' },
        { name: 'filipe silva' },
        { name: 'filipe silva' },
        { name: 'filipe silva' }
      ])
      .then((ops) => {
        expect(ops.result).to.be.a('object');
        expect(ops.result).to.have.property('ok');
        expect(ops.result).to.have.property('n');
        expect(ops.result.ok).to.be.equal(1);
        expect(ops.result.n).to.be.equal(4);
        done();
      }).catch(done);
    });
  });

  context('read data', () => {

    it('expect find record', (done) => {
      collection('find', { name: 'filipe silva' }, { limit: 0 })
        .then(ops => ops.toArray())
        .then(ops => {
          expect(ops).to.be.a('array');
          expect(ops[0]).to.be.a('object');
          expect(ops[0]).to.have.a.property('_id');
          expect(ops[0]).to.have.a.property('name');
          expect(ops[0].name).to.equal('filipe silva');
          done();
        });
    });

    it('expect findOne record', (done) => {
      collection('findOne', { name: 'filipe silva' }, { limit: 0 })
          .then((ops) => {
            expect(ops).to.be.a('object');
            expect(ops).to.have.a.property('_id');
            expect(ops).to.have.a.property('name');
            expect(ops.name).to.equal('filipe silva');
            done();
          }).catch(done);
    });
  });

  context('update data', () => {
    it('expect update data', (done) => {
      collection('updateOne',
        { name: 'filipe silva' },
        {
          $set: { name: 'filipe melo' }
        })
                .then((ops) => {
                  expect(ops).to.be.a('object');
                  expect(ops).to.have.a.property('result');
                  expect(ops.result).to.have.a.property('ok');
                  expect(ops.result.ok).to.be.equal(1);
                  done();
                }).catch(done);
    });
  });

  context('delete data', () => {
    it('expect delete data', (done) => {
      collection('remove', { name: 'filipe silva' })
                .then((ops) => {
                  expect(ops).to.be.a('object');
                  expect(ops).to.have.a.property('result');
                  expect(ops.result).to.have.a.property('ok');
                  expect(ops.result.ok).to.be.equal(1);
                  done();
                });
    });
  });
  
  context('validate operations in another collection', () => {
    it('expect create data in other collection', (done) => {
      const col = db.collection('new_collection');

      col('insert', { name: 'verify' })
        .then((ops) => {
  
          expect(ops.result).to.be.a('object');
          expect(ops.result).to.have.property('ok');
          expect(ops.result.ok).to.be.equal(1);
  
          done();
        }).catch(done);
    });
    
    it('expect create data in two collections', async () => {
      const col = db.collection('new_collection2');
      const col2 = db.collection('new_collection2');
      col('remove', {});
      col2('remove', {});
      try {
        const ops = await col('insert', { name: 'verify' })
        expect(ops.result).to.be.a('object');
        expect(ops.result).to.have.property('ok');
        expect(ops.result.ok).to.be.equal(1);
  
        const ops2 = await col2('insert', { name: 'verify' })
        expect(ops2.result).to.be.a('object');
        expect(ops2.result).to.have.property('ok');
        expect(ops2.result.ok).to.be.equal(1);

      } catch(err) {
        throw err;
      }
    });
  });
});
