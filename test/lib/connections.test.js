'use strict';

const assert = require('assert');
const expect = require('chai').expect;
const sinon = require('sinon');

const MongoClient = require('mongodb').MongoClient;

const Connections = require('../../lib/connections');

describe('Unit test for Connections', () => {

  let url,
      connections,
      sandbox,
      stubMongoClientConn;

  beforeEach(() => {
    url = 'mongodb://travis:tests@localhost:27017/exampleTest';
    sandbox = sinon.createSandbox();

    stubMongoClientConn = sandbox.stub(MongoClient, 'connect');

    connections = new Connections(url);
  });

  afterEach(() => sandbox.restore());

  context('Connections()', () => {
    it('expect connections has url property with string param', () => {
      expect(connections.url).to.be.a('string');
      expect(connections.url).to.be.equal(url);
    });
  });

  context('createConnection()', () => {
    it('expect call mongoClient connect on call createConnection', () => {
      connections.createConnection();
      expect(stubMongoClientConn.called).to.be.true;
    });

    it('expect connection has property _connection after call createConnection', () => {
      connections.createConnection();

      expect(connections).to.have.property('_connection');
      expect(typeof connections._connection).to.be.equal('object');
    });
  });

  context('get connection()', () => {
    it('expect get object connection as result', () => {
      connections.createConnection();
      const result = connections.connection;
      expect(typeof result).to.be.equal('object');
    });

    it('expect undefined for connection if createConnection not called', () => {
      const result = connections.connection;
      expect(result).to.be.undefined;
    });
  });
});
