'use strict';

const MongoClient = require('mongodb').MongoClient;
const operations = require('./operations');
const Collections = require('./collections');

class DB {

  constructor(config, mongoClient) {
    if (!config) {
      throw new Error('connection configuration not defined');
    }

    const userAndPass = (username, password) => {
      if(username && password) {
        return `${username}:${password}@`;
      }

      if(username) {
        return `${username}@`;
      }

      return '';
    };

    this.url = `mongodb://${userAndPass(config.username, config.password)
    }${config.server}:${config.port}/${config.database_name}${(config.query_params || '')}`;

    this.config = config;
    this.config.database = config.database_name

    if (!this.validConfig) {
      throw new Error('invalid connection configuration json');
    }

    this.MongoClient = mongoClient || MongoClient;

    this.conn = this.MongoClient.connect(this.url, {
      useUnifiedTopology: true,
    });

    return this;
  }

  open(collectionName, Operations = operations) {
    return new Operations(collectionName, this.connection, {
      MongoClient: this.MongoClient,
    });
  }

  collection(name) {
    const collections = new Collections(this.connection);
    this.activeCol = collections.use(name);
    return this.operation.bind(this);
  }

  operation() {
    if (!arguments.length) {
      throw new Error(`You must call like the following arguments
          operation('find', { your: 'search' })
        `);
    }

    const operationType = arguments[0];
    const params = Array.from(arguments).filter((item, i) => i !== 0);

    return this.activeCol.then(col => col[operationType].apply(col, params));
  }

  close() {
    this.db.close();
  };

  get connection() {
    return this.conn.then(result => {
      const dbname = !this.config.database_name ? 
        this.config.database :
        this.config.database_name;
      return result.db(dbname);
    });
  }

  get validConfig() {
    if (this.config.hasOwnProperty('server') &&
        this.config.hasOwnProperty('port') &&
        this.config.hasOwnProperty('database_name')) {
          return true;
      }
  }
}

module.exports = DB;
