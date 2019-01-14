'use strict';

const assert = require('assert');
const expect = require('chai').expect;
const sinon = require('sinon');

const DB = require('../../lib/db.js');

const Connections = require('../../lib/connections');
const Collections = require('../../lib/collections');

describe('Unit test for DB', () => {

  const config = {
    "username": "travis",
    "password": "tests",
    "server": "localhost",
    "port": 27017,
    "database_name": "exampleTest"
  };

  const sandbox = sinon.createSandbox();

  let db,
      stubCreateConnection,
      spyCollectionsConstructor;

  beforeEach(() => {
    stubCreateConnection = sandbox.stub(Connections.prototype, 'createConnection');
    spyCollectionsConstructor = sandbox.spy(Collections.constructor);
  });

  afterEach(() => sandbox.restore());

  context('DB()', () => {

    afterEach(() => {
      db = null;
    });

    it('expect throw a error after invalid config', () => {
      try {
        expect(new DB()).to.throw(/connection configuration not defined/gi);
      } catch(e) {}
    });

    it('expect throw a error after invalid config', () => {
      try {
        expect(new DB({})).to.throw(/invalid connection configuration json/gi);
      } catch(e) {}
    });

    it('expect db instantion has property url and config', () => {
      db = new DB(config);
      expect(db).to.have.property('url')
      expect(db).to.have.property('config');

      expect(db.url).to.be.a('string');
      expect(db.config).to.be.a('object');

      expect(db.url).to.be.equal('mongodb://travis:tests@localhost:27017/exampleTest');
      expect(db.config).to.be.equal(config);
    });

    it('expect db url has user only', () => {
      let configClone = { ...config };
      delete configClone.password;

      db = new DB(configClone);

      expect(db.url).to.be.equal('mongodb://travis@localhost:27017/exampleTest');
    });

    it('expect db url has no user and password', () => {

      let configClone = { ...config };
      delete configClone.username;
      delete configClone.password;

      db = new DB(configClone);

      expect(db.url).to.be.equal('mongodb://localhost:27017/exampleTest');
    });
  });

  context('open()', () => {
    let result;

    beforeEach(() => {
      db = new DB(config);
      result = db.open('example');
    });

    it('expect open be a function', () => {
      expect(db.open).to.be.a('function');
    });

    it('expect createConnection be called after open call', () => {
      expect(stubCreateConnection.called).to.be.true;
    });

    it('expect result on call open are a object with operations properties', () => {
      expect(result).to.be.a('object');

      expect(result).to.have.property('find');
      expect(result).to.have.property('remove');
      expect(result).to.have.property('insert');
      expect(result).to.have.property('update');

      expect(result.find).to.be.a('function');
      expect(result.remove).to.be.a('function');
      expect(result.insert).to.be.a('function');
      expect(result.update).to.be.a('function');
    });
  });

  context('get validConfig()', () => {

    beforeEach(() => {
      db = new DB(config);
    });

    afterEach(() => {
      config.port = 27017;
      config.database_name = 'exampleTest';
      config.server = 'localhost';
    });

    it('expect call validConfig are true', () => {
      const result = db.validConfig;
      expect(result).to.be.true;
    });

    it('expect validConfig be false when don\'t have a property server in config', () => {
      delete db.config.server;
      expect(db.validConfig).to.be.undefined;
    });

    it('expect validConfig be false when don\'t have a property port in config', () => {
      delete db.config.port;
      expect(db.validConfig).to.be.undefined;
    });

    it('expect validConfig be false when don\'t have a property database_name in config', () => {
      delete db.config.database_name;
      expect(db.validConfig).to.be.undefined;
    });
  });
});
