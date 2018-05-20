'use strict';

const assert = require('assert');
const expect = require('chai').expect;
const sinon = require('sinon');


const DB = require('../../lib/db.js');

describe('Test simple connection mongo', function() {
  let db;

  beforeEach(function () {
    db = new DB();
  });

  it('expect DB instance throw error without config', function () {

    expect(db).to.throw();

  });

  context('open', () => {

  });


});
