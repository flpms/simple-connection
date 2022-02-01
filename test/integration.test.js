'use strict';

const expect = require('chai').expect;

const DB = require('./../lib/db.js');

describe('Test integration with mongo db', () => {

  let db, collection;

  const CONFIG = {
    "protocol": "mongodb://",
    "server": "localhost",
    "port": 27017,
    "database_name": "mydb_test"
  };

  beforeEach(() => {
    db = new DB(CONFIG);

    collection = db.open('exampleCollection');
  });

  context('insert data', () => {
    it('expect create data', async () => {
      const ops = await collection('insertOne', { name: 'filipe silva' });

      expect(ops).to.be.an('object');
      expect(ops).to.have.property('acknowledged');
      expect(ops).to.have.property('insertedId');
      expect(ops.acknowledged).to.be.true;

    });

    it('expect multiple data', async () => {
      const bulk = [
        { name: 'filipe silva' },
        { name: 'filipe silva' },
        { name: 'filipe silva' },
        { name: 'filipe silva' }
      ];

      const ops = await collection('insertMany', bulk);

      expect(ops).to.be.an('object');
      expect(ops).to.have.property('acknowledged');
      expect(ops).to.have.property('insertedCount');
      expect(ops).to.have.property('insertedIds');
      expect(ops.acknowledged).to.be.true;
      expect(ops.insertedCount).to.be.equal(bulk.length);
    });
  });

  context('read data', () => {

    it('expect find record', async() => {
      const ops = await collection('find', { name: 'filipe silva' }, { limit: 0 });
      const result = await ops.toArray();
        
      expect(result).to.be.a('array');
      expect(result[0]).to.be.a('object');
      expect(result[0]).to.have.a.property('_id');
      expect(result[0]).to.have.a.property('name');
      expect(result[0].name).to.equal('filipe silva');
    });

    it('expect findOne record', async() => {
      const ops = await collection('findOne', { name: 'filipe silva' }, { limit: 0 });
          
      expect(ops).to.be.a('object');
      expect(ops).to.have.a.property('_id');
      expect(ops).to.have.a.property('name');
      expect(ops.name).to.equal('filipe silva');
    });
  });

  context('update data', () => {
    it('expect update data', async () => {
      const ops = await collection('updateOne',
        { name: 'filipe silva' },
        {
          $set: { name: 'filipe melo' }
        });

      expect(ops).to.be.an('object');
      
      expect(ops).to.have.property('acknowledged');
      expect(ops).to.have.property('modifiedCount');
      expect(ops).to.have.property('matchedCount');
      expect(ops.acknowledged).to.be.true;
      expect(ops.modifiedCount).to.be.equal(1);
    });
  });

  context('delete data', () => {
    it('expect delete data', async () => {
      const ops = await collection('deleteOne', { name: 'filipe silva' })

      expect(ops).to.be.a('object');
      expect(ops).to.have.a.property('acknowledged');
      expect(ops).to.have.a.property('deletedCount');
      expect(ops.acknowledged).to.be.true;
      expect(ops.deletedCount).to.be.equal(1);              
    });
  });
  
  context('validate operations in another collection', () => {
    it('expect create data in other collection', async () => {
      const col = db.collection('new_collection');

      const ops = await col('insertOne', { name: 'verify' });

      expect(ops).to.be.an('object');
      expect(ops).to.have.property('acknowledged');
      expect(ops).to.have.property('insertedId');
      expect(ops.acknowledged).to.be.true;
    });
    
    it('expect create data in two collections', async () => {
      const col = db.collection('new_collection2');
      const col2 = db.collection('new_collection2');
      const ops = await col('deleteMany', {});
      const ops2 = await col2('deleteMany', {});

      try {
        const ops = await col('insertOne', { name: 'verify' });

        expect(ops).to.be.an('object');
        expect(ops).to.have.property('acknowledged');
        expect(ops).to.have.property('insertedId');
        expect(ops.acknowledged).to.be.true;
  
        const ops2 = await col2('insertOne', { name: 'verify' })
        expect(ops2).to.be.an('object');
        expect(ops2).to.have.property('acknowledged');
        expect(ops2).to.have.property('insertedId');
        expect(ops2.acknowledged).to.be.true;

      } catch(err) {
        throw err;
      }
    });
  });
});
