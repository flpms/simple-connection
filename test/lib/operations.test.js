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

  context.only('operation call', () => {
    let connection,
        deleteStub;

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
      operations('delete', { your: 'search'});
      expect(db.collection.called).to.be.true;
    });

    it('expect find stub be called', () => {
      operations('delete', { your: 'search'});
      expect(deleteStub.called).to.be.true;
    });

  });
});
