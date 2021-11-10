const request = require("supertest");
const jwt = require("jsonwebtoken");
import { TokenMan } from "../../src/utils/tokenMan";
import model, { MErr } from "../../src/model";
import {MErrorCode} from "../../src/utils/dbMan/merror";
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
    
    it("Return food items when no database error", async () => {
        model.foodItem.get_AllFoodItemsWithVariants = jest.fn().mockReturnValueOnce(
            new Promise((resolve, reject) => {
                resolve([{code: MErrorCode.NO_ERROR},[]]);
            })
        );
        const res = await request(app).get("/api/food-item/food-items-all").send();
        expect(res.status).toBe(200);
        expect(res.body.data).toBeDefined();
    });

    it("Return internal server error for database error", async () => {
      model.foodItem.get_AllFoodItemsWithVariants = jest.fn().mockReturnValueOnce(
          new Promise((resolve, reject) => {
              resolve([{code: MErrorCode.UNKNOWN},null]);
          })
      );
      const res = await request(app).get("/api/food-item/food-items-all").send();
      expect(res.status).toBe(500);
  });

    
  });
 
});
