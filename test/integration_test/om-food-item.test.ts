const request = require("supertest");
const jwt = require("jsonwebtoken");
import { TokenMan } from "../../src/utils/tokenMan";
import { v4 as UUID } from "uuid";

let app: any;

jest.setTimeout(60000);

describe("api/food-items functions", () => {

  describe("api/food-item/food-items-all", () => {
    beforeEach(() => {
      app = require("../../src/main");
    });
    afterEach(() => {
      app.close();
    });
    
    it("give 200 status for any user", async () => {
      const data = {};
      const res = await request(app).get("/api/food-item/food-items-all").send();

      expect(res.status).toBe(200);
    });
  });
 
});
