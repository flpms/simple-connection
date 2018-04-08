'use strict';

const assert = require('assert');
const expect = require('chai').expect;

const DB = require('../../lib/db.js');

describe('Test simple connection mongo', function() {

  it('expect DB instance throw error without config', function () {
    var db = new DB();
    
  });

    //
    // it ('Should read config', function() {
    //     assert.equal(typeof db, 'object');
    //     chaiExpect(db).to.have.property('collection');
    // });
    //
    // describe('Should read a collection', function() {
    //     let tests = db.collection('tests');
    //
    //     it ('Should init collection', function() {
    //         assert.equal(typeof tests, 'object');
    //         chaiExpect(tests).to.have.property('find');
    //         chaiExpect(tests).to.have.property('insert');
    //         chaiExpect(tests).to.have.property('update');
    //         chaiExpect(tests).to.have.property('remove');
    //     });
    // });
    //
    // let carsCollection = db.collection('cars');
    //
    // before('Clear database', function() {
    //     carsCollection.remove({}).catch(function(err) {
    //         done(err);
    //     })
    // });
    //
    // describe('Testing inserts operations', function() {
    //     it('fail when insert cause no data for new colletion', function(done) {
    //         carsCollection.insert().catch(function(err) {
    //             assert.equal(err, 'Data not found');
    //             done();
    //         });
    //     });
    //
    //     it('insert 3 itens in a new colletion using InsertMany', function(done) {
    //
    //         let carsList = [{
    //                 name: 'Corolla',
    //                 year: '2015',
    //                 company: 'Toyota'
    //             },
    //             {
    //                 name: 'X1',
    //                 year: '2015',
    //                 company: 'BMW'
    //             },
    //             {
    //                 name: 'Onix',
    //                 year: '2015',
    //                 company: 'Chevrolet'
    //             }];
    //
    //         carsCollection.insert(carsList).then(function(sucess) {
    //
    //             assert.equal(typeof sucess, 'object');
    //             chaiExpect(sucess).to.have.property('result');
    //             chaiExpect(sucess).to.have.property('ops');
    //             chaiExpect(sucess).to.have.property('insertedCount');
    //             chaiExpect(sucess).to.have.property('insertedIds');
    //
    //             chaiExpect(sucess.result.n).to.equal(3);
    //             chaiExpect(sucess.ops).to.have.length(3);
    //             chaiExpect(sucess.insertedCount).to.equal(3);
    //
    //             done();
    //         });
    //     });
    //
    //     it('insert a item in a car colletion using Insert', function(done) {
    //
    //         let car = {
    //                 name: 'Civic',
    //                 year: '2015',
    //                 company: 'Honda'
    //             };
    //
    //         carsCollection.insert(car).then(function(sucess) {
    //
    //             assert.equal(typeof sucess, 'object');
    //             chaiExpect(sucess).to.have.property('result');
    //             chaiExpect(sucess).to.have.property('ops');
    //             chaiExpect(sucess).to.have.property('insertedCount');
    //             chaiExpect(sucess).to.have.property('insertedIds');
    //
    //             chaiExpect(sucess.result.n).to.equal(1);
    //             chaiExpect(sucess.ops).to.have.length(1);
    //             chaiExpect(sucess.insertedCount).to.equal(1);
    //
    //             done();
    //         });
    //     });
    // });
    //
    // describe('Testing find operations', function() {
    //     it('return entire collections when do a search with no data for new colletion', function(done) {
    //         carsCollection.find().then(function(sucess) {
    //             chaiExpect(sucess).to.be.a('array');
    //             chaiExpect(sucess).to.be.a('array');
    //             done();
    //         });
    //     });
    //
    //     it('return entire BMW when do a search with data', function(done) {
    //         carsCollection.find({name: 'X1', company: 'BMW'}).then(function(sucess) {
    //
    //             chaiExpect(sucess.length).to.not.equal(0);
    //             chaiExpect(sucess[0]).to.have.property('_id');
    //             chaiExpect(sucess[0]).to.have.property('name');
    //             chaiExpect(sucess[0]).to.have.property('year');
    //             chaiExpect(sucess[0]).to.have.property('company');
    //
    //             chaiExpect(sucess[0].company).to.equal('BMW');
    //             chaiExpect(sucess[0].year).to.equal('2015');
    //             chaiExpect(sucess[0].name).to.equal('X1');
    //
    //             done();
    //         });
    //     });
    // });
    //
    // describe('Testing update operations', function() {
    //     it('fail cause no data passed', function(done) {
    //         carsCollection.update().catch(function(err) {
    //
    //             assert.equal(err, 'Data not found');
    //             done();
    //         });
    //     });
    //
    //     it('update all civic cars year from Civic', function(done) {
    //         carsCollection.update({name: 'Civic'}, {name: 'Civic', year: 2012, company: 'Honda'}).then(function(sucess) {
    //
    //             chaiExpect(sucess).to.have.property('result');
    //             chaiExpect(sucess.result).to.have.property('ok');
    //             chaiExpect(sucess.result).to.have.property('nModified');
    //             chaiExpect(sucess.result).to.have.property('n');
    //             chaiExpect(sucess.result.nModified).to.not.equal(0);
    //
    //             done();
    //         });
    //     });
    //
    //     it('update year for Toyota', function(done) {
    //         carsCollection.update({company: 'Toyota'}, {$set : { year: 2014 }}).then(function(sucess) {
    //
    //             chaiExpect(sucess).to.have.property('result');
    //             chaiExpect(sucess.result).to.have.property('ok');
    //             chaiExpect(sucess.result).to.have.property('nModified');
    //             chaiExpect(sucess.result).to.have.property('n');
    //             chaiExpect(sucess.result.nModified).to.not.equal(0);
    //
    //             done();
    //         });
    //     });
    // });
    //
    // describe('Testing remove operations', function() {
    //     it('No remove cause no data to query', function(done) {
    //         carsCollection.remove().catch(function(err) {
    //             assert.equal(err, 'Data not found');
    //             done();
    //         });
    //     });
    //
    //     it('remove onix cars', function(done) {
    //         carsCollection.remove({name: "Onix"}).then(function(sucess) {
    //             chaiExpect(sucess).to.have.property('result');
    //             chaiExpect(sucess.result).to.have.property('ok');
    //             chaiExpect(sucess.result).to.have.property('n');
    //             chaiExpect(sucess.result.n).to.not.equal(0);
    //
    //             done();
    //         }).catch(function(err) {
    //             done();
    //         });
    //     });
    //
    //     it('Clear DB', function(done) {
    //         carsCollection.remove({}).then(function(sucess) {
    //
    //             chaiExpect(sucess).to.have.property('result');
    //             chaiExpect(sucess.result).to.have.property('ok');
    //             chaiExpect(sucess.result).to.have.property('n');
    //             chaiExpect(sucess.result.n).to.not.equal(0);
    //
    //             done();
    //         }).catch(function(err) {
    //             done();
    //         });
    //     });
    // });
});
