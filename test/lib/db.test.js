'use strict';

const assert = require('assert');
const DB = require('../../lib/db.js');
const chaiExpect = require('chai').expect;

describe('Test simple connection mongo', function() {

    let db = DB({
        "username": "travis",
        "password": "tests",
        "server": "localhost",
        "port": 27017,
        "database_name": "exampleTest"
    });

    it ('Should read config', function() {
        assert.equal(typeof db, 'object');
        chaiExpect(db).to.have.property('collection');
    });

    describe('Should read a collection', function() {
        let tests = db.collection('tests');

        it ('Should init collection', function() {
            assert.equal(typeof tests, 'object');
            chaiExpect(tests).to.have.property('find');
            chaiExpect(tests).to.have.property('insert');
            chaiExpect(tests).to.have.property('update');
            chaiExpect(tests).to.have.property('remove');
        });
    });
});
