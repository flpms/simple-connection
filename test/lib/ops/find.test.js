'use strict';

var assert = require('assert');
var crud = require('../../../lib/ops');
var chaiExpect = require('chai').expect;

describe('Test find operations', function() {

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

    before(function() {
        var argsToInsert = { teste: 'value 3', example: 2};
        var promise = crud.remove.apply(context, [argsToInsert, true]);
        promise.then(function(){
            done();
        }).catch(function(err){
            done(err);
        });
    });

    it ('should be capable to find value inserted before', function(done) {
        var argsToFind = { teste: 'value 3', example: 2};
        var promise = crud.find.call(context, argsToFind);

        promise.then(function(sucess) {
            assert.equal(3, sucess.result.n);
            done();
        }).catch(function(err) {
            done();
        });
    });
});
