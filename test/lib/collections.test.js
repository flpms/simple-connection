'use strict';

const assert = require('assert');
const expect = require('chai').expect;
const sinon = require('sinon');

const MongoClient = require('mongodb').MongoClient;

const Collections = require('../../lib/collections');

describe('Unit test for Collections', () => {

  let url,
      collections,
      sandbox,
      stubMongoClientConn;

  beforeEach(() => {
    url = 'mongodb://travis:tests@localhost:27017/exampleTest';
    sandbox = sinon.createSandbox();

    stubMongoClientConn = sandbox.stub(MongoClient, 'connect');

    collections = new Collections(url);
  });

  afterEach(() => sandbox.restore());

  context('Collections()', () => {
    it('expect connections has url property with string param', () => {
      expect(collections).to.be.a('object');

      expect(collections).to.have.property('find');
      expect(collections).to.have.property('remove');
      expect(collections).to.have.property('insert');
      expect(collections).to.have.property('update');

      expect(collections.find).to.be.a('function');
      expect(collections.remove).to.be.a('function');
      expect(collections.insert).to.be.a('function');
      expect(collections.update).to.be.a('function');
    });
  });
});
