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

  async connectOpen(dbName: string) {
    await this.client.connect();
    this.dbInstance = await this.client.db(dbName);
    return this.dbInstance;
  }

  async collection(collectionName: string) {
    return this.dbInstance.collection(collectionName);
  }
}