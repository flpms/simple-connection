# Simple Connection - [![build status](https://secure.travis-ci.org/flpms/simple-connection.png)](http://travis-ci.org/flpms/simple-connection) [![Code Climate](https://codeclimate.com/github/flpms/simple-connection/badges/gpa.svg)](https://codeclimate.com/github/flpms/simple-connection)

A small implementation to use mongodb with native drives provided by mongodb, but with promises.

## Install

`npm install simple-connection --save`


## About config object

Configurantion object the you can build connection url the keys username and password are optional. Also you can send a `query_params` key to build connection url with more mongo parameters. In example you can found how to send configuration object and how to create instantion to use with simple-connection.

## Example

```` javascript

  const DB = require('simple-connection');

  const CONFIG = {
    "username": process.env.MONGO_USER,
    "password": process.env.MONGO_PASS,
    "server": "127.0.0.1",
    "port": 27017,
    "database_name": "exampleTest"
  };

  const db = new DB(CONFIG);
  const collection = db.open('yourCollection');

  // to insert many pass an array with objects
  collection.insert({ data: 'to insert' }).then((success) => {
    console.log(success);
  }).catch((err) => {
    console.log(err);
  });

  // Or if your prefer async/await
  try {
    const result = await collection.insert({ data: 'to insert' });
    console.log(result);
  } catch(error)
    console.log(err);
  };

  collection.find({ data: 'to search' }).then((success) => {
    console.log(success);
  }).catch((err) => {
    console.log(err);
  });

  collection.update({ data: 'to search' }, { data: 'to update' }).then((success) => {
    console.log(success);
  }).catch((err) => {
    console.log(err);
  });

  collection.remove({ data: 'to remove' }, options).then((success) => {
    console.log(success);
  }).catch((err) => {
    console.log(err);
  });

````
