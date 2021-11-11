const request = require("supertest");
const jwt = require("jsonwebtoken");
import { TokenMan } from "../../src/utils/tokenMan";
import { v4 as UUID } from "uuid";
import * as payloads from "../../src/utils/testing/payloads";

let app: any;

jest.setTimeout(60000);

describe("api/room", () => {

  describe("api/room/rooms GET", () => {

    beforeEach(() => {
      app = require("../../src/main");

    });

    afterEach(() => {
      app.close();
    });

    it("should give 200 when it return all rooms", async () => {
      const accessToken = TokenMan.getAccessToken(payloads.branchManagerPayload);
      const res = await request(app).get("/api/room/rooms")
        .auth(accessToken, { type: 'bearer' });

      expect(res.status).toBe(200);
    });

  });

  describe("api/room/add-room", () => {

    beforeEach(() => {
      app = require("../../src/main");
    });

    afterEach(() => {
      app.close();
    });

    it("should give 400 status when values are invalid", async () => {
      const accessToken = TokenMan.getAccessToken(payloads.branchManagerPayload);
      const data = {}; //todo: check for invalid values

      const res = await request(app).post("/api/room/add-room")
        .auth(accessToken, { type: 'bearer' })
        .send(data);

      expect(res.status).toBe(400);
    });

    it("should give 200 status when a room is added", async () => {
      const accessToken = TokenMan.getAccessToken(payloads.branchManagerPayload);
      const data = {
        roomNumber: 14,
        capacity: 1,
        roomType: "Deluxe",
        price: 20000
      };
      const res = await request(app).post("/api/room/add-room")
        .auth(accessToken, { type: 'bearer' })
        .send(data);

      expect(res.status).toBe(200);
    });
  });

  describe("api/room/remove-room", () => {

    beforeEach(() => {
      app = require("../../src/main");
    });

    afterEach(() => {
      app.close();
    });

    it("should give 404 status when room number is not found", async () => {
      const accessToken = TokenMan.getAccessToken(payloads.branchManagerPayload);
      const roomNumber = "323";
      const path = "/api/room/remove-room/" + roomNumber;

      const res = await request(app).put(path)
        .auth(accessToken, { type: 'bearer' });

      expect(res.status).toBe(404);
    });

    it("should give 200 status when a room is removed", async () => {
      const accessToken = TokenMan.getAccessToken(payloads.branchManagerPayload);
      const roomNumber = "1" 
      const path = "/api/room/remove-room/" + roomNumber;

      const res = await request(app).put(path)
        .auth(accessToken, { type: 'bearer' });

      expect(res.status).toBe(200);
    });
  });


});
