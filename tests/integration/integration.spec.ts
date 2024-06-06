'use strict';

import { before, describe, it, after } from 'node:test';

import {expect} from 'chai';

import { SimpleConnection } from "../../lib/index.ts";

describe('Test integration with mongo db', () => {
  let db: SimpleConnection, collection: any;

  const insertMockData = { name: "Lewis Hamilton", id: Date.now(), teams: ["Mercedes", "McLaren"] };

  before(async() => {
    db = new SimpleConnection(
      "mongodb://testRoot:testRootSecret@localhost:27017/TEST"
    );
    await db.open();

    collection = await db.collection("collection_test");
  });

  after(async() => {
    await db.client.close();
  });

  it('expect use insertOne', async () => {
    const ops = await collection.insertOne(insertMockData);

    expect(ops).to.be.an('object');
  });

  it('read data', async () => {
    const ops = await collection.find(insertMockData).toArray();

    expect(ops).to.be.an("array");
    expect(ops.length).to.be.equal(1);
    expect(ops[0].name).to.be.deep.equal(insertMockData.name);
  });

  it("update data", async () => {
    const ops = await collection.updateOne(
      { name: insertMockData.name },
      { $set: { name: "Max Verstappen" } }
    );

    expect(ops).to.be.an("object");
    expect(ops.modifiedCount).to.be.equal(1);
  });

  it("delete data", async() => {
    await collection.deleteOne({ name: "Max Verstappen" });
    const ops = await collection.find(insertMockData).toArray();
    expect(ops).to.be.an("array");
    expect(ops.length).to.be.equal(0);
  });

  it("validate operations in another collection", async () => {
    const collDrivers = await db.collection("collection_drivers");

    const ops = await collDrivers.insertMany([
      insertMockData,
      { name: "Max Verstappen", id: Date.now(), teams: ["Red Bull"]},
      { name: "Valtteri Bottas", id: Date.now(), teams: ["Mercedes", "Sauber"]},
      { name: "Sebastian Vettel", id: Date.now(), teams: ["Ferrari", "Red Bull", "Aston Martin"]},
      { name: "Charles Leclerc", id: Date.now(), teams: ["Ferrari", "Sauber"]},
      { name: "Lando Norris", id: Date.now(), teams: ["McLaren"]},
    ]);

    expect(ops).to.be.an("object");

    const opsRead = await collDrivers.find({
      teams: "McLaren"
    }).toArray();

    expect(opsRead).to.be.an("array");
    expect(opsRead.length).to.be.equal(2);

    await collDrivers.drop();
  });
});
