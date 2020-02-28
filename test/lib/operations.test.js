'use strict';

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
      };

  context('Operations()', () => {
    let connection;

    beforeEach(() => {
      connection = sandbox.stub().resolves(db);

      const promise = connection();
      operations = new Operations(collectionName, promise, {});
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
      const conn = connection();
      operations = new Operations(collectionName, conn);
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
  });
});
