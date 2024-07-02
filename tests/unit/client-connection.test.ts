import { before, describe, it } from "node:test";

import sinon from "sinon";
import { expect } from "chai";

import { ClientConnection } from "../../src/client-connection.ts";

const sbox = sinon.createSandbox();

describe("Unit Test for ClientConnection", () => {
  let db: ClientConnection;

  const dbMethodsStub = {
    connect: sbox.stub(),
    db: sbox.stub(),
  };

  const collectionStub = {
    collection: sbox.stub(),
  };

  before(async () => {
    dbMethodsStub.connect.resolves();
    dbMethodsStub.db.resolves(collectionStub);

    db = new ClientConnection();
    // @ts-ignore
    db.client = dbMethodsStub;
  });

  it("expect connectOpen calls client connect", async () => {
    await db.connectOpen("test");
    expect(dbMethodsStub.connect.called).to.be.true;
  });

  it("expect connectOpen calls client db", async () => {
    await db.connectOpen("test");
    expect(dbMethodsStub.db.called).to.be.true;
  });

  it("expect collection calls dbInstance collection", async () => {
    await db.connectOpen("test");
    await db.collection("test");
    expect(collectionStub.collection.called).to.be.true;
  });
});