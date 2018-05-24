'use strict';

const assert = require('assert');
const expect = require('chai').expect;
const sinon = require('sinon');

const Operations = require('../../lib/operations');
const Connections = require('../../lib/connections');

describe('Unit test for operations', () => {

  let collectionName,
      mockConnection,
      operations,
      connObject;

  beforeEach(() => {
    collectionName = 'collectionTest';
    mockConnection = new Promise((resolve, reject) => {

    });
    operations = new Operations(collectionName, mockConnection);
  });

  // afterEach(() => operations.connection.restore());

  context('Operations()', () => {
    it('expect operations has connection and collectionName as property', () => {
      expect(operations).to.have.property('connection');
      expect(operations).to.have.property('collectionName');

      expect(operations.connection).to.be.equal(mockConnection);
      expect(operations.collectionName).to.be.equal(collectionName);
    });
  });

  context('createPromise', () => {
    it('expect return a object after call createPromise', () => {
      const result = operations.createPromise((res, rej) => {
        res();
      });

      expect(typeof result).to.be.equal('object');
    });
  });

  context('retriveCollection()', () => {
    it('expect spy be called after call retriveCollection', () => {
      let db = {
        collection: sinon.spy()
      };

      operations.retriveCollection(db);

      expect(db.collection.called).to.be.true;
      expect(db.collection.calledWith(sinon.match(String))).to.be.true;
      expect(db.collection.calledWith('collectionTest')).to.be.true;
    });
  });

  context('checkForData()', () => {
    it('expect return true after nothing send', () => {
      const result = operations.checkForData();
      expect(result).to.be.true;
    });

    it('expect return false after nothing send', () => {
      const result = operations.checkForData({test: 'example'});
      expect(result).to.be.false;
    });
  });

  context('insert()', () => {
    let sandbox,
        dbMockObject,
        spyCreatePromise,
        spyCheckForData,
        spyRetriveCollection,
        collectionMock;

    beforeEach(() => {
      sandbox = sinon.createSandbox();

      collectionMock = {
        insertMany: sinon.stub(),
        insert: sinon.stub()
      };

      dbMockObject = {
        close: sandbox.spy(),
        collection: sandbox.stub().returns(collectionMock)
      };

      spyCreatePromise = sandbox.spy(operations, 'createPromise');
      spyCheckForData = sandbox.spy(operations, 'checkForData');
      spyRetriveCollection = sandbox.spy(operations, 'retriveCollection');

      operations.connection = new Promise((resolve) => {
        resolve(dbMockObject);
      });

      operations.insert({ test: 'teste' });
    });

    afterEach(() => sandbox.restore());

    it('expect call createPromise', () => {
      operations.insert({ test: 'teste' });
      expect(spyCreatePromise.called).to.be.true;
    });

    it('expect call checkForData', () => {
      operations.insert({ test: 'teste' });
      expect(spyCheckForData.called).to.be.true;
    });

    it('expect call retriveCollection', (done) => {
      collectionMock.insert.callsFake((arg1, arg2, cb) => {
        cb(null, true);
      });

      operations.insert({ test: 'teste' }).then((result) => {
        expect(spyRetriveCollection.called).to.be.true;
        done();
      });
    });

    it('expect close called after complete operations', (done) => {
      collectionMock.insert.callsFake((arg1, arg2, cb) => {
        cb(null, true);
      });

      operations.insert({ test: 'teste' }).then((result) => {
        expect(dbMockObject.close.called).to.be.true;
        done();
      });
    });

    it('expect call insert', (done) => {
      collectionMock.insert.callsFake((arg1, arg2, cb) => {
        cb(null, true);
      });

      operations.insert({ test: 'teste' }).then((result) => {
        expect(collectionMock.insert.called).to.be.true;
        done();
      });
    });

    it('expect call insertMany for array data', (done) => {
      collectionMock.insertMany.callsFake((arg1, arg2, cb) => {
        cb(null, true);
      });

      operations.insert([{ test: 'teste' }]).then((result) => {
        expect(collectionMock.insertMany.called).to.be.true;
        done();
      });
    });

  });

  context('find()', () => {
    let sandbox,
        toArrayMock,
        collectionMock,
        dbMockObject,
        spyCreatePromise,
        spyCheckForData,
        spyRetriveCollection;

    beforeEach(() => {
      sandbox = sinon.createSandbox();

      toArrayMock = {
        toArray: sinon.stub()
      };

      collectionMock = {
        toArrayMock,
        find: sinon.stub().returns(toArrayMock)
      };

      dbMockObject = {
        close: sandbox.spy(),
        collection: sandbox.stub().returns(collectionMock)
      };

      spyCreatePromise = sandbox.spy(operations, 'createPromise');
      spyCheckForData = sandbox.spy(operations, 'checkForData');
      spyRetriveCollection = sandbox.spy(operations, 'retriveCollection');


      operations.connection = new Promise((resolve) => {
        resolve(dbMockObject);
      });
    });

    afterEach(() => sandbox.restore());

    it('expect call createPromise', () => {
      operations.find({ test: 'teste' });
      expect(spyCreatePromise.called).to.be.true;
    });


    it('expect call checkForData', () => {
      operations.find({ test: 'teste' });
      expect(spyCheckForData.called).to.be.true;
    });

    it('expect call retriveCollection', (done) => {
      toArrayMock.toArray.callsFake((cb) => {
        cb(null, [{test: 'teste'}]);
        // return { toArray: () => {} };
      });

      operations.find({ test: 'teste' }).then((result) => {
        expect(spyRetriveCollection.called).to.be.true;
        done();
      });
    });

    it('expect close called after complete operations', (done) => {
      toArrayMock.toArray.callsFake((cb) => {
        cb(null, true);
      });

      operations.find({ test: 'teste' }).then((result) => {
        expect(dbMockObject.close.called).to.be.true;
        done();
      });
    });
  });

  context('remove()', () => {});

  context('update()', () => {});
});
