'use strict';

var assert = require('assert');
var crud = require('../../../lib/ops');
var chaiExpect = require('chai').expect;

describe('Test insert operations', function() {

    var config = {
        "username": "travis",
        "password": "tests",
        "server": "localhost",
        "port": 27017,
        "database_name": "exampleTest"
    };

    var url = `mongodb://${config.server}:${config.port}/${config.database_name}`;
    var context = { url: url, collectionName: 'collectionTest'};

    it('Should fail, if no data', function() {
        var promise = crud.insert.call(context, '');

        promise.then().catch(function(err) {
            assert.equal('Data not Found', err);
            done();
        });
    });

    it ('should be capable to insert a context for insert operations', function(done) {
        var argsToInsert = { teste: 'value 3', example: 2};
        var promise = crud.insert.call(context, argsToInsert);

        promise.then(function(sucess) {
            assert.equal(3, sucess.result.n);
            done();
        }).catch(function(err) {
            done();
        });
    });

    it ('should insertMany with a context for operations', function(done) {
        var argsToInsert = [
            { teste: 'value 4', example: 3},
            { teste: 'value 5', example: 4},
            { teste: 'value 6', example: 5}
        ];
        var promise = crud.insert.call(context, argsToInsert);

        promise.then(function(sucess) {
            assert.equal(3, sucess.result.n);
            done();
        }).catch(function(err) {
            done();
        });
    });
});
