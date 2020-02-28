'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');

const Collections = require('./../../lib/collections');

describe('Unit test for collections', () => {
  let collections;
  let connection;
  let ops;
  let db = 'example';

  beforeEach(() => {
    ops = sinon.stub().resolves(db);

    connection = sinon.stub().resolves({
      collection: ops
    });

    collections = new Collections(connection());
  });

  it('expect collections instance be an object with property use', () => {
    expect(collections).to.be.an('object');
    expect(collections).to.have.property('use');
  });

  it('expect collection return db after promise resolves', async () => {
    const result = await collections.use('example');
    expect(connection.called).to.be.true;
    expect(result).to.be.equal(db);
  });
});
