var assert = require('assert');
var connection = require('../../lib/connect-db.js');
var chai = require('chai');
var chaiExpect = chai.expect;
var chaiShould = chai.should();

 describe('Test connection with db', function() {

    it('Should return a rejected promise', function(done) {

        var conn = connection();

        conn.then().catch(function(e) {
            assert.equal('object', typeof e);
            assert.equal(e.message, 'Parameter \"url\" must be a string, not undefined');

            done();
        });
    });

    it('Should return a sucess promise', function(done) {

        var config = {
            "username": "travis",
            "password": "tests",
            "server": "localhost",
            "port": 27017,
            "database_name": "exampleTest"
        };

        connection(`mongodb://${config.server}:${config.port}/${config.database_name}`).then(function(db) {

            chaiExpect(db).to.be.a('object');
            chaiExpect(db).to.have.property('collection');

            db.close();
            done();
        });
    });
});
