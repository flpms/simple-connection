'use strict';

const assert = require('assert');
const expect = require('chai').expect;
const sinon = require('sinon');
const sandbox = sinon.createSandbox();

const Operations = require('../../lib/operations');

describe('Unit test for operations', () => {

  let operations,
      collectionName = 'collectionTest',
      db = {
        collection: sandbox.stub(),
        close: sandbox.stub()
      },
      promiseCatchHandler = () => {};

  context('Operations()', () => {
    let connection;

    beforeEach(() => {
      connection = sandbox.stub().resolves(db);
      operations = new Operations(collectionName, connection());
    });

    it('expect call in connection', () => {
      expect(connection.called).to.be.true;
    });
    it('expect operations has property collection ', () => {
      expect(operations).to.be.a('function');
    });
  });

  context('operation call', () => {
    let connection,
        deleteStub,
        findStub;

    before(() => {
      deleteStub = { delete: sandbox.stub() };
      db.collection.returns(deleteStub);
      connection = sandbox.stub().resolves(db);
      operations = new Operations(collectionName, connection());
    });

    it('expect throw a error after invalid call', () => {
      try {
        expect(operations()).to.throw(/You must call like the following arguments/gi);
      } catch(e) {}
    });

    it('expect call collection from db after call operations', () => {
      deleteStub.delete.resolves({});

      operations('delete', { your: 'search'});
      expect(db.collection.called).to.be.true;
    });

    it('expect delete stub be called', () => {
      deleteStub.delete.resolves({});

      operations('delete', { your: 'search'});
      expect(deleteStub.delete.called).to.be.true;
    });

    it('expect close function be called after delete resolves and return same result', async () => {
      const resolves = 'result';
      deleteStub.delete.resolves(resolves);

      const result = await operations('delete', { your: 'search'});
      expect(db.close.called).to.be.true;
      expect(result).to.be.equal(resolves);
    });

    it('expect find stub be called', async () => {
      findStub =  { find: sandbox.stub().resolves('find') };
      db.collection.returns(findStub);
      connection = sandbox.stub().resolves(db);
      let operation = new Operations(collectionName, connection());

      let operationObject = await operation('find', { your: 'search'});

      expect(operationObject).to.have.property('find');
      expect(operationObject).to.have.property('close');

      expect(operationObject.close).to.be.a('function');
    });
  });
});
