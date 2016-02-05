# Simple Connection - [![build status](https://secure.travis-ci.org/flpms/simple-connection.png)](http://travis-ci.org/flpms/simple-connection)

I get some codes which I used in a project, and put into this repository.
Is a small implementation for access mongodb with native drives provided by mongodb.

Is a ES 6 ready.

## Install

`npm install simple-connection --save`

## Example

```` javascript

var DB = require('simple-connection');

var db = DB.config({
      "username": "",
      "password": "#",
      "server": "localhost",
      "port": 27017,
      "database_name": "exampleTest"
  });

  db.collection('yourCollection');

  db.find({your: 'search'}).then((success) => {
    console.log(success);
  }).catch((err) => {
    console.log(err);
  })

  db.remove({your: 'search'}, options).then((success) => {
    console.log(success);
  }).catch((err) => {
    console.log(err);
  })

````
