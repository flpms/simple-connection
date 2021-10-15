# Simple Connection - ![Node.js Package](https://github.com/flpms/simple-connection/workflows/Node.js%20Package/badge.svg?branch=develop)[![build status](https://secure.travis-ci.org/flpms/simple-connection.png)](http://travis-ci.org/flpms/simple-connection) [![Code Climate](https://codeclimate.com/github/flpms/simple-connection/badges/gpa.svg)](https://codeclimate.com/github/flpms/simple-connection)

A small implementation to use mongodb with native drives provided by mongodb, but with promises.

## Install

`npm install simple-connection --save`

## About config object

Configuration object you can build url connection and the keys username and password are optional. Also you can send a `query_params` key to build url connection with more mongo parameters.

In example you can found how to send configuration object and how to create a instance to use with simple-connection.

## 3.x version

To improve performance this version left promises and use more operations and promises from [mongodb package](https://www.npmjs.com/package/mongodb). This change make things a little different. Specially at `find` operation, **pay attention when use that** and not forget close database after operations.

Another improve is all operations that [mongodb package](https://www.npmjs.com/package/mongodb) has, simple-connection support.

### 3.1 version

We made some changes more detail can be found [here](https://flpms.me/simple-connection-3-1/).

## Example

```` javascript

  const DB = require('simple-connection');

  const CONFIG = {
    "protocol": "mongo+srv://", // it's optional, the default will be mongodb://
    "username": process.env.MONGO_USER,
    "password": process.env.MONGO_PASS,
    "server": "127.0.0.1",
    "port": 27017,
    "database_name": "exampleTest"
  };

  const db = new DB(CONFIG);
  const collection = db.open('yourCollection');

  // to insert many pass an array with objects
  collection('insert', { data: 'to insert' })
    .then((success) => {
      console.log(success);
    }).catch((err) => {
      console.log(err);
    });

  // Or if your prefer async/await
  try {
    const result = await collection('insert', ({ data: 'to insert' });
    console.log(result);
  } catch(error)
    console.log(err);
  };

  collection('find', { data: 'to search' })
    .then((dbResources) => {
      dbResources.find.toArray().then((result) => {
        console.log(result);
      }).catch((err) => {
        console.log(err);
      });
    });

  collection('update', { data: 'to search' }, { data: 'to update' })
    .then((success) => {
      console.log(success);
    }).catch((err) => {
      console.log(err);
    });

  collection('remove', { data: 'to remove' }, options)
    .then((success) => {
      console.log(success);
    }).catch((err) => {
      console.log(err);
    });

````

### v4

I've some plans to create a v4 with intents to have types.d.ts and some improvements in perfomance

