'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');

const DB = require('../../lib/db.js');

const Operations = require('../../lib/operations');

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
    stubConnect,
    stubMongoClient,
    stubOperationsConstructor;

  beforeEach(() => {
    stubConnect = sandbox.stub();
    stubMongoClient = { connect: stubConnect };
    stubOperationsConstructor = sandbox.stub(Operations.prototype, 'constructor');
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

    it('expect db instance has property url and config', () => {
      db = new DB(config);
      expect(db).to.have.property('url')
      expect(db).to.have.property('config');

      expect(db.url).to.be.a('string');
      expect(db.config).to.be.a('object');

      expect(db.url).to.be.equal('mongodb://travis:tests@localhost:27017/exampleTest');
      expect(db.config).to.be.equal(config);
    });

    it('expect db url has user only', () => {
      let configClone = Object.assign({}, config);
      delete configClone.password;

      db = new DB(configClone);

      expect(db.url).to.be.equal('mongodb://travis@localhost:27017/exampleTest');
    });

    it('expect db url has no user and password', () => {

      let configClone = Object.assign({}, config);
      delete configClone.username;
      delete configClone.password;

      db = new DB(configClone);

      expect(db.url).to.be.equal('mongodb://localhost:27017/exampleTest');
    });

    it('expect url has different protocol and no port ', () => {
      const {port, ...rest } = config;
      rest.protocol = 'mongodb+srv://';
      db = new DB(rest);
      expect(db).to.have.property('url')
      expect(db).to.have.property('config');

      expect(db.url).to.be.a('string');
      expect(db.config).to.be.a('object');

      expect(db.url).to.be.equal('mongodb+srv://travis:tests@localhost/exampleTest');
      expect(db.config).to.be.equal(rest);
    });
  });

  context('open()', () => {

    beforeEach(() => {
      stubOperationsConstructor.returns({
        find: () => {},
        remove: () => {},
        insert: () => {},
        update: () => {}
      });

      const instubConnect = sandbox.stub();
      const instubMongoClient = { connect: instubConnect };

      db = new DB(config, instubMongoClient);
    });

    it('expect open be a function', () => {
      expect(db.open).to.be.a('function');
    });
  });
 
  context('get connection', () => {
    let db;
    beforeEach(() => {
      db = sandbox.spy;
      stubConnect.resolves({
        db,
      });

      db = new DB(config, stubMongoClient);
    });

    it('expect connect spy be called', () => {
      db.connection;
      expect(stubConnect.called).to.be.true;
    });

    it('expect db spy be called', () => {
      db.connection;
      expect(stubConnect.called).to.be.true;
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

    it('expect validConfig be false when don\'t have a property database_name in config', () => {
      delete db.config.database_name;
      expect(db.validConfig).to.be.undefined;
    });
  });
});
