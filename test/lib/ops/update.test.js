'use strict';

var assert = require('assert');
var crud = require('../../../lib/ops');
var chaiExpect = require('chai').expect;

describe('Test update operations', function() {

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

    it ('should remove item', function(done) {
        var argsToFind = { teste: 'value 3'};
        var argsToUpdate = { teste: 'value 3', example: 2, allTest: 'sucess'};
        var promise = crud.update.apply(context, [argsToFind, argsToUpdate, { upsert: true }]);

        promise.then(function(sucess) {
            assert.equal(1, sucess.result.n);
            done();
        }).catch(function(err) {
            done();
        });
    });
});
