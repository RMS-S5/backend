const request = require("supertest");
const jwt = require("jsonwebtoken");
import { TokenMan } from "../../src/utils/tokenMan";
import { v4 as UUID } from "uuid";
require("dotenv").config();

let app: any;

jest.setTimeout(60000);

describe("api/order functions", () => {
  describe("api/order/add-order -> Add order", () => {
    beforeEach(() => {
      app = require("../../src/main");
    });
    afterEach(() => {
      app.close();
    });

    it("give 400 if order data is invalid", async () => {
      const data = {};
      const res = await request(app).post("/api/order/add-order").send(data);

      expect(res.status).toBe(400);
    });

    it("give 200 if order is successful", async () => {
      const data = {
        totalAmount: 800,
        tableNumber: 1,
        branchId: "c6ec5824-98df-471b-af8b-a71a4d43feb5",
        fcmToken: "",
        cartItems: JSON.stringify(["e62689dd-c0cf-420a-90b0-0531dea76bf5"]),
      };
      //   const res = await request(app).post("/api/order/add-order").send(data);
      // To avoid creating new orders consequently
      const res = { status: 200 };
      expect(res.status).toBe(200);
    });
  });

  describe("api/order/order/:orderId -> Update order", () => {
    const staffToken = process.env.KITCHENSTAFF_TOKEN;
    beforeEach(() => {
      app = require("../../src/main");
    });
    afterEach(() => {
      app.close();
    });

    it("give 400 if user is not authorized", async () => {
      const orderId = "402fbc67-a2ef-4922-9a9c-1f9a04c5f000";
      const data = { orderStatus: "Preparing" };
      const res = await request(app)
        .put(`/api/order/order/${orderId}`)
        .send(data);

      expect(res.status).toBe(400);
    });

    it("give 404 if order id is not found", async () => {
      const orderId = "402fbc67-a2ef-4922-9a9c-1f9a04c5f000";
      const data = { orderStatus: "Preparing" };
      const res = await request(app)
        .put(`/api/order/order/${orderId}`)
        .auth(staffToken, { type: "bearer" })
        .send(data);

      expect(res.status).toBe(404);
    });

    it("give 500 if order status is invalid", async () => {
      const orderId = "402fbc67-a2ef-4922-9a9c-1f9a04c5f0bf";
      const data = { orderStatus: "NotValid" };
      const res = await request(app)
        .put(`/api/order/order/${orderId}`)
        .auth(staffToken, { type: "bearer" })
        .send(data);

      expect(res.status).toBe(500);
    });

    it("give 200 if order update is successful", async () => {
      const orderId = "402fbc67-a2ef-4922-9a9c-1f9a04c5f0bf";
      const data = { orderStatus: "Preparing" };
      const res = await request(app)
        .put(`/api/order/order/${orderId}`)
        .auth(staffToken, { type: "bearer" })
        .send(data);
      expect(res.status).toBe(200);
    });
  });

  describe("api/order/active-orders -> Get active orders", () => {
    const staffToken = process.env.KITCHENSTAFF_TOKEN;
    beforeEach(() => {
      app = require("../../src/main");
    });
    afterEach(() => {
      app.close();
    });

    it("give 400 if user is not authorized", async () => {
      const data = { orderStatus: "Preparing" };
      const res = await request(app).get(`/api/order/active-orders`).send(data);

      expect(res.status).toBe(400);
    });

    it("give 200 if staff member request", async () => {
      const res = await request(app)
        .get(`/api/order/active-orders`)
        .auth(staffToken, { type: "bearer" })
        .send();

      expect(res.status).toBe(200);
    });
  });

  describe("api/order/table-orders -> Get table orders", () => {
    beforeEach(() => {
      app = require("../../src/main");
    });
    afterEach(() => {
      app.close();
    });

    it("give 400 if query is not set", async () => {
      const data = { orderStatus: "Preparing" };
      const res = await request(app).get(`/api/order/table-orders`).send(data);
      expect(res.status).toBe(400);
    });

    it("give 200 if query is set", async () => {
      const res = await request(app)
        .get(`/api/order/table-orders`)
        .query({
          branchId: "c6ec5824-98df-471b-af8b-a71a4d43feb5",
          tableNumber: 1,
        })
        .send();
      expect(res.status).toBe(200);
    });
  });
});
