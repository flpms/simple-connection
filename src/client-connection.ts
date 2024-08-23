import { MongoClient } from 'mongodb';

export class ClientConnection {
  private _client!: MongoClient;

  public get client(): MongoClient {
    return this._client;
  }

  public set client(value: MongoClient) {
    this._client = value;
  }
  private dbInstance: any;

  openDB(_db: string) {
    return (MConnClient: MongoClient) => MConnClient;
  }

  async openConnect(dbName: string) {
    return this.client.connect().then(() => {
      this.dbInstance = this.client.db(dbName);
      return this.dbInstance;
    });
  }

  collection(collectionName: string) {
    return this.dbInstance.collection(collectionName);
  }
}