'use strict';

const assert = require('assert');
const DB = require('../../lib/db.js');
const chaiExpect = require('chai').expect;

describe('Test Simple Connection mongo', function() {

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

        it ('Should return a promise with error if no data passed', function(done) {
            let result = tests.insert();
            result.then().catch(function(err) {

                assert.equal(err, 'Data not found');

                done();
            });
        });

        it('Should return a promise with sucess when insert data', function(done) {
            this.timeout(20000);

            let result = tests.insert({
                teste: 'value 3',
                example: 2
            });

            result.then(function(success) {

                chaiExpect(success).to.have.property('result');
                chaiExpect(success).to.have.property('ops');
                chaiExpect(success).to.have.property('insertedCount');
                chaiExpect(success).to.have.property('insertedIds');

                chaiExpect(success.result).to.have.property('ok');
                chaiExpect(success.result).to.have.property('n');

                chaiExpect(success.ops).to.be.a('array');
                chaiExpect(success.ops[0]).to.have.property('teste');
                chaiExpect(success.ops[0]).to.have.property('example');
                chaiExpect(success.ops[0]).to.have.property('_id');

                chaiExpect(success.insertedCount).to.be.a('number');
                chaiExpect(success.insertedIds).to.be.a('array');

                done();
            }).catch();
        });

        it('Should return promise with error cause no data passed');

        it('Should return a promise with sucess when find data', function(done) {
            this.timeout(30000);

            let result = tests.find({example: 2});

            result.then(function(success) {

                chaiExpect(success).to.be.a('array');
                chaiExpect(success[0]).to.have.property('teste');
                chaiExpect(success[0]).to.have.property('example');
                chaiExpect(success[0]).to.have.property('_id');

                chaiExpect(success[0].example).to.equal(1);

                done();
            }).catch(function (err){
                console.log(err);
            });
        });

        it('Should return sucess for update data');
        it('Should return fail when update data');
        it('Should return sucess for remove data');
        it('Should return sucess when remove data');
    });
});
