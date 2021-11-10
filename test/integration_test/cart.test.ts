const request = require("supertest");
const jwt = require("jsonwebtoken");
import { TokenMan } from "../../src/utils/tokenMan";
import { v4 as UUID } from "uuid";

let app: any;

jest.setTimeout(60000);

describe("api/cart functions", () => {
  const customerAccessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkOTNmNjZjNC01NDE3LTRiMmUtYTIyYS0zNDIxNjQzOWY1MjEiLCJlbWFpbCI6ImpvaG5kb2VAZ21haWwuY29tIiwiYWNjb3VudFR5cGUiOiJDdXN0b21lciIsImJyYW5jaElkIjpudWxsLCJmaXJzdE5hbWUiOiJKb2huIiwiaWF0IjoxNjM2NTIxMjczLCJleHAiOjE2MzY2MDc2NzN9.3JyhzhsvqyELhfyPQlcqsK5I4bCVaMPzWlyLE58JXGY`;
  const cartItemIdS = UUID();

  describe("api/cart/add-cart -> Add cart ", () => {
    beforeEach(() => {
      app = require("../../src/main");
    });
    afterEach(() => {
      app.close();
    });

    it("give 200 if cart is created for user", async () => {
      const res = await request(app)
        .post("/api/cart/add-cart")
        .auth(customerAccessToken, { type: "bearer" })
        .send();

      expect(res.status).toBe(200);
    });

    // New cart for guest users
    // it("give 200 if cart is created for guest", async () => {
    //     const res = await request(app)
    //         .post("/api/cart/add-cart")
    //         .send();

    //      expect(res.status).toBe(200);
    // });
  });

  describe("api/cart/add-cart-item -> Add cart item", () => {
    beforeEach(() => {
      app = require("../../src/main");
    });
    afterEach(() => {
      app.close();
    });

    it("give 500 if card id is wrong", async () => {
      const cartItemId = UUID();
      const data = {
        cartItemId,
        foodItemId: "a1bdd731-5bd5-4dca-9062-6d9a2e93d3f4",
        variantId: "1a3f95c5-bad7-48b6-976b-1ec1b8399e56",
        price: 500.0,
        cartId: "000d218e-5593-2345-8943-18ab308f1000",
        quantity: 2,
      };
      const res = await request(app).post("/api/cart/add-cart-item").send(data);

      expect(res.status).toBe(500);
    });

      it("give 200 if cart item is added", async () => {
      const data = {
        cartItemId: cartItemIdS,
        foodItemId: "a1bdd731-5bd5-4dca-9062-6d9a2e93d3f4",
        variantId: "1a3f95c5-bad7-48b6-976b-1ec1b8399e56",
        price: 500.0,
        cartId: "1e8d218e-5593-4135-8943-18ab308f157b",
        quantity: 2,
      };
      const res = await request(app).post("/api/cart/add-cart-item").send(data);

      expect(res.status).toBe(200);
    });

    it("give 400 if data are not valid", async () => {
      const data = {
        foodItemId: "a1bdd731-5bd5-4dca-9062-6d9a2e93d3f4",
        variantId: "1a3f95c5-bad7-48b6-976b-1ec1b8399e56",
        cartId: "1e8d218e-5593-4135-8943-18ab308f157b",
        quantity: 2,
      };
      const res = await request(app).post("/api/cart/add-cart-item").send(data);

      expect(res.status).toBe(400);
    });
  });

  describe("api/cart/cart-data/:cartId -> get card data", () => {
    beforeEach(() => {
      app = require("../../src/main");
    });
    afterEach(() => {
      app.close();
    });

    it("give 404 if cart id is not found", async () => {
      const cartId = "d93f96c4-5117-4b2e-a22a-34216439f521";
      const res = await request(app)
        .get(`/api/cart/cart-data/${cartId}`)
        .send();

      expect(res.status).toBe(404);
    });

    it("give 200 if cart id is found", async () => {
      const cartId = "1e8d218e-5593-4135-8943-18ab308f157b";
      const res = await request(app)
        .get(`/api/cart/cart-data/${cartId}`)
        .send();

      expect(res.status).toBe(200);
    });
  });

  describe("api/cart/customer-cart/:customerId -> get card data by customer id", () => {
    beforeEach(() => {
      app = require("../../src/main");
    });
    afterEach(() => {
      app.close();
    });

    it("give 404 if customer id is not found", async () => {
      const customerId = "d93f96c4-5117-4b2e-a22a-34216439f463";
      const res = await request(app)
        .get(`/api/cart/customer-cart/${customerId}`)
        .send();

      expect(res.status).toBe(404);
    });

    it("give 200 if cart is found", async () => {
      const customerId = "d93f66c4-5417-4b2e-a22a-34216439f521";
      const res = await request(app)
        .get(`/api/cart/customer-cart/${customerId}`)
        .send();

      expect(res.status).toBe(200);
    });
  });

  describe("api/cart/cart-items/:cartId -> get all cart items by cart id", () => {
    beforeEach(() => {
      app = require("../../src/main");
    });
    afterEach(() => {
      app.close();
    });

    it("give empty array if cart id is not found", async () => {
      const cartId = "d93f96c4-5117-4b2e-a22a-34216439f200";
      const res = await request(app)
        .get(`/api/cart/cart-items/${cartId}`)
        .send();

      expect(res.body.data).toEqual([]);
    });

    it("give 200 if cart is found", async () => {
      const cartId = "1e8d218e-5593-4135-8943-18ab308f157b";
      const res = await request(app)
        .get(`/api/cart/cart-items/${cartId}`)
        .send();

      expect(res.status).toBe(200);
    });
  });

  describe("api/cart/cart-item/:cartItemId -> Remove cart item", () => {
    beforeEach(() => {
      app = require("../../src/main");
    });
    afterEach(() => {
      app.close();
    });

    it("give 404 if cart id is not found", async () => {
      const cartItemId = "d93f96c4-5117-4b2e-a22a-34216439f200";
      const res = await request(app)
        .delete(`/api/cart/cart-item/${cartItemId}`)
        .send();

      expect(res.status).toBe(404);
    });

    it("give 200 if cart item is properly removed", async () => {
      const res = await request(app)
        .delete(`/api/cart/cart-item/${cartItemIdS}`)
        .send();
      expect(res.status).toBe(404);
    });
  });
});
