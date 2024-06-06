import { MongoClient } from "mongodb";

import {ClientConnection} from "./client-connection.ts";

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

  async open() {
    this.client = new MongoClient(this.connectionString);
    await super.connectOpen(this.dbName);
  }
}