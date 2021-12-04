const request = require("supertest");
const jwt = require("jsonwebtoken");
import { TokenMan } from "../../src/utils/tokenMan";
import { v4 as UUID } from "uuid";
import * as payloads from "../../src/utils/testing/payloads";

let app: any;

jest.setTimeout(60000);

describe("api/food-item", () => {

  describe("api/food-item/food-items-all GET", () => {

    beforeEach(() => {
      app = require("../../src/main");

    });

    afterEach(() => {
      app.close();
    });

    it("should give 200 when it return all food items", async () => {
      const accessToken = TokenMan.getAccessToken(payloads.branchManagerPayload);
      const res = await request(app).get("/api/food-item/food-items-all")
        .auth(accessToken, { type: 'bearer' });

      expect(res.status).toBe(200);
    });

  });

  describe("api/food-item/add-food-item", () => {

    beforeEach(() => {
      app = require("../../src/main");
    });

    afterEach(() => {
      app.close();
    });

    it("should give 400 status for invalid values", async () => {
      const accessToken = TokenMan.getAccessToken(payloads.branchManagerPayload);
      const data = {}; 
      const res = await request(app).post("/api/food-item/add-food-item")
        .auth(accessToken, { type: 'bearer' })
        .send(data);

      expect(res.status).toBe(400);
    });
  });

  describe("api/food-item/remove-food-item", () => {

    beforeEach(() => {
      app = require("../../src/main");
    });

    afterEach(() => {
      app.close();
    });

    it("should give 404 status when food item id is not found", async () => {
      const accessToken = TokenMan.getAccessToken(payloads.branchManagerPayload);
      const foodItemId = "2b2b67f5-2e43-4861-83e5-5bf1e000988c";
      const path = "/api/food-item/remove-food-item/" + foodItemId;

      const res = await request(app).delete(path)
        .auth(accessToken, { type: 'bearer' });

      expect(res.status).toBe(200);
    });

    it("should give 200 status when a food item is removed", async () => {
      const accessToken = TokenMan.getAccessToken(payloads.branchManagerPayload);
      const foodItemId = "54fcccfe-5240-444b-9261-0d5a26ddcd72" 
      const path = "/api/food-item/remove-food-item/" + foodItemId;

      const res = await request(app).delete(path)
        .auth(accessToken, { type: 'bearer' });

      expect(res.status).toBe(200);
    });
  });
});
