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
      connObject,
      promiseCatchHandler = () => {};

  beforeEach(() => {
    collectionName = 'collectionTest';
    mockConnection = new Promise((resolve, reject) => {});
    operations = new Operations(collectionName, mockConnection);
  });

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
      const result = operations.checkForData({ test: 'example' });
      expect(result).to.be.false;
    });
  });

  context('startOperations', () => {
    it('expect return a promise when call startOperations', () => {
      let result = operations.startOperations();
      expect(typeof result).to.equal('object');
    });
  });

  context('createOperationObject', () => {
    let sandbox,
        stubRetriveCollection,
        dbMockObject,
        result;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      stubRetriveCollection = sandbox.stub(operations, 'retriveCollection');

      dbMockObject = {
        obj: 'obj'
      };

      stubRetriveCollection.returns(dbMockObject);
      result = operations.createOperationObject(dbMockObject);
    });

    it('expect call retriveCollection with db informed', () => {
      expect(stubRetriveCollection.calledWith(dbMockObject)).to.be.true;
    });

    it('expect get object with collection properties and informed db', () => {
      expect(result).to.be.a('object');
    });
  });

  context('insert()', () => {
    let sandbox,
        dbMockObject,
        spyCreatePromise,
        spyCheckForData,
        spyStartOperations,
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
      spyStartOperations = sandbox.spy(operations, 'startOperations');

      operations.connection = new Promise(resolve => resolve(dbMockObject));
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

    it('expect call checkForData and get a rejection with proper message', (done) => {
      operations.insert().catch((err) => {
        expect(spyCheckForData.called).to.be.true;
        expect(err).to.equal('No data to insert');
        done();
      });
    });

    it('expect call startOperations', () => {
      operations.insert({ test: 'teste' });
      expect(spyStartOperations.called).to.be.true;
    });

    it('expect close called after complete operations', (done) => {
      collectionMock.insert.callsFake((arg1, arg2, cb) => cb(null, true));

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

    it('expect rejection flow be called with proper error on call insert', (done) => {
      collectionMock.insert.callsFake((arg1, arg2, cb) => cb('error'));

      operations.insert({ test: 'teste' }).catch((result) => {
        expect(result).to.be.a('string');
        expect(result).to.equal('error');

        done();
      });
    });

    it('expect call insertMany for array data', (done) => {
      collectionMock.insertMany.callsFake((arg1, arg2, cb) => cb(null, true));

      operations.insert([{ test: 'teste' }]).then((result) => {
        expect(collectionMock.insertMany.called).to.be.true;
        done();
      });
    });

    it('expect rejection flow be called with proper error on call insertMany', (done) => {
      collectionMock.insertMany.callsFake((arg1, arg2, cb) => cb('error'));

      operations.insert([{ test: 'teste' }]).catch((result) => {
        expect(result).to.be.a('string');
        expect(result).to.equal('error');

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
        spyStartOperations;

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
      spyStartOperations = sandbox.spy(operations, 'startOperations');

      operations.connection = new Promise(resolve => resolve(dbMockObject));
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

    it('expect call checkForData and get a rejection with proper message', (done) => {
      operations.find().catch((err) => {
        expect(spyCheckForData.called).to.be.true;
        expect(err).to.equal('No data to find');
        done();
      });
    });

    it('expect call startOperations', () => {
      operations.find({ test: 'teste' });
      expect(spyStartOperations.called).to.be.true;
    });

    it('expect call collection find with empty string in projection argument', (done) => {
      collectionMock.find.callsFake((data, projection) => {
        expect(projection).to.equal('');
        done();
        return toArrayMock;
      });

      operations.find({ test: 'teste' }, '');
    });

    it('expect call collection find with projection argument', (done) => {
      let _projectionMock = { $elemMatch: {} };

      collectionMock.find.callsFake((data, projection) => {
        expect(projection).to.be.a('object');
        expect(projection).to.be.equal(_projectionMock);
        done();
        return toArrayMock;
      });

      operations.find({ test: 'teste' }, _projectionMock);
    });

    it('expect close called after complete operations', (done) => {
      toArrayMock.toArray.callsFake(cb => cb(null, true));

      operations.find({ test: 'teste' }).then((result) => {
        expect(dbMockObject.close.called).to.be.true;
        done();
      });
    });

    it('expect rejection flow be called with proper error', (done) => {
      toArrayMock.toArray.callsFake(cb => cb('error', true));

      operations.find({ test: 'teste' }).catch((result) => {
        expect(result).to.be.a('string');
        expect(result).to.equal('error');

        done();
      });
    });
  });

  context('remove()', () => {
    let sandbox,
        toArrayMock,
        collectionMock,
        dbMockObject,
        spyCreatePromise,
        spyCheckForData,
        spyStartOperations;

    beforeEach(() => {
      sandbox = sinon.createSandbox();

      collectionMock = {
        remove: sinon.stub()
      };

      dbMockObject = {
        close: sandbox.spy(),
        collection: sandbox.stub().returns(collectionMock)
      };

      spyCreatePromise = sandbox.spy(operations, 'createPromise');
      spyCheckForData = sandbox.spy(operations, 'checkForData');
      spyStartOperations = sandbox.spy(operations, 'startOperations');

      operations.connection = new Promise(resolve => resolve(dbMockObject));
    });

    afterEach(() => sandbox.restore());

    it('expect call createPromise', () => {
      operations.remove({ test: 'teste' }, { test: 'test2'});
      expect(spyCreatePromise.called).to.be.true;
    });

    it('expect call checkForData', () => {
      operations.remove({ test: 'teste' });
      expect(spyCheckForData.called).to.be.true;
    });

    it('expect call checkForData and get a rejection with proper message', (done) => {
      operations.remove().catch((err) => {
        expect(spyCheckForData.called).to.be.true;
        expect(err).to.equal('No data to remove');
        done();
      });
    });

    it('expect call startOperations', () => {
      operations.remove({ test: 'teste' });
      expect(spyStartOperations.called).to.be.true;
    });

    it('expect close called after complete operations', (done) => {
      collectionMock.remove.callsFake((query, options, cb) => cb(false, true));

      operations.remove({ test: 'teste' }).then((result) => {
        expect(dbMockObject.close.called).to.be.true;
        done();
      });
    });

    it('expect rejection flow be called with proper error on call remove', (done) => {
      collectionMock.remove.callsFake((arg1, arg2, cb) => cb('error'));

      operations.remove({ test: 'teste' }).catch((result) => {
        expect(result).to.be.a('string');
        expect(result).to.equal('error');

        done();
      });
    });
  });

  context('update()', () => {
    let sandbox,
        dbMockObject,
        spyCreatePromise,
        spyCheckForData,
        spyStartOperations,
        collectionMock;

    beforeEach(() => {
      sandbox = sinon.createSandbox();

      collectionMock = {
        update: sinon.stub()
      };

      dbMockObject = {
        close: sandbox.spy(),
        collection: sandbox.stub().returns(collectionMock)
      };

      spyCreatePromise = sandbox.spy(operations, 'createPromise');
      spyCheckForData = sandbox.spy(operations, 'checkForData');
      spyStartOperations = sandbox.spy(operations, 'startOperations');

      operations.connection = new Promise(resolve => resolve(dbMockObject));

    });

    afterEach(() => sandbox.restore());

    it('expect call createPromise', () => {
      operations.update({ test: 'teste' }, { test: 'test2'}).catch(promiseCatchHandler);
      expect(spyCreatePromise.called).to.be.true;
    });

    it('expect checkForData be called', () => {
      operations.update({ test: 'teste' }, { test: 'test2'}).catch(promiseCatchHandler);
      expect(spyCheckForData.called).to.be.true;
    });

    it('expect call startOperations\n', () => {
      operations.update({ test: 'teste' }, { test: 'test2'}).catch(promiseCatchHandler);
      expect(spyStartOperations.called).to.be.true;
    });

    it(`expect call checkForData without query param and
                                get a rejection with proper message\n`, (done) => {

      operations.update(undefined, { test: 'test2'}).catch((err) => {

        expect(err).to.equal('No query to looking for');
        done();
      });
    });

    it(`expect call checkForData without update param and
                                get a rejection with proper message\n`, (done) => {

      operations.update({ test: 'test2'}).catch((err) => {
        expect(err).to.equal('No data to update');
        done();
      });
    });

    it('expect close called after complete operations', (done) => {
      collectionMock.update.callsFake((query, update, options, cb) => cb(false, true));

      operations.update({ test: 'teste' }, { test: 'test2'}).then((result) => {
        expect(dbMockObject.close.called).to.be.true;
        done();
      });
    });

    it('expect rejection flow be called with proper error on call remove', (done) => {
      collectionMock.update.callsFake((query, update, options, cb) => cb('error'));

      operations.update({ test: 'teste' }, { test: 'test2'}).catch((result) => {
        expect(result).to.be.a('string');
        expect(result).to.equal('error');

        done();
      });
    });
  });
});
