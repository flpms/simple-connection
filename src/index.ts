import { MongoClient } from "mongodb";

import {ClientConnection} from "./client-connection.js";

export class SimpleConnection extends ClientConnection {
  private connectionString: string;
  private dbName: string;

  constructor(connectionString: string) {
    const dbName = connectionString?.split("/")?.pop() || "";

    if (!dbName) {
      throw new Error("Invalid connection string");
    }

    super();
    this.connectionString = connectionString;
    this.dbName = dbName;
  }

  open() {
    this.client = new MongoClient(this.connectionString);
    return new Promise((resolve, reject) => {
      super.openConnect(this.dbName)
        .then((db) => resolve(db));
    });
  }
}