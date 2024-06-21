import { before, describe, it, after } from "node:test";

import sinon from "sinon";
import { expect } from "chai";

import { SimpleConnection } from "../../lib/index.ts";

describe("Unit Test for SimpleConnection index", () => {

  it("expect error for instance without string", async () => {
    try {
      // @ts-ignore
      const instance = new SimpleConnection();
    } catch(e) {
      expect(e).to.be.an("error");
      expect(e.message).to.be.equal("Invalid connection string");
    }
  });

  it('expect error for string without db name', async () => {
    try {
      const instance = new SimpleConnection("mongodb://localhost");
    } catch(e) {
      expect(e).to.be.an("error");
      expect(e.message).to.be.equal("Invalid connection string");
    }
  });

});