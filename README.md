# Simple Connection - [![Pull Request](https://github.com/flpms/simple-connection/actions/workflows/pull-request.yml/badge.svg?branch=main)](https://github.com/flpms/simple-connection/actions/workflows/pull-request.yml) [![Code Climate](https://codeclimate.com/github/flpms/simple-connection/badges/gpa.svg)](https://codeclimate.com/github/flpms/simple-connection)

## Description

A utility mongo wrapper connection to simplify the use of the native mongodb driver.

#### Our legacy description from a 9 year old package

A small implementation to use mongodb with native drives provided by mongodb, but with promises.


## Installation

```bash
npm install simple-connection
```

## Usage - v4

```javascript

import SimpleConnection from 'simple-connection';

(async() => {
  const db = new SimpleConnection("mongodb://testRoot:testRootSecret@localhost:27017/TEST");

  try {
    // open database connection
    await db.open();

    // get collection
    collection = await db.collection("collection_test");
  } catch() {
    console.error("Error connecting to database");
  } finally {
    // close the connection
    db.client.close();
  }
})()
```

## Old versions

[V3](https://github.com/flpms/simple-connection/blob/main/docs/README-v3.md)
