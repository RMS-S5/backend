const request = require("supertest");
const jwt = require("jsonwebtoken");
let app: any;

jest.setTimeout(60000);

describe("api/user functions", () => {
  
  
  describe("api/user/login", () => {

    beforeEach(() => {
      app = require("../../main");
    });
  
    afterEach(() => {
      app.close();
    });

    const password = "123456";
    const customerEmail = "pasinduyeshann@gmail.com";
    const staffEmail = "nuwan@gmail.com";

    it("give 400 status when no input is given", async () => {
      const data = {};
      const res = await request(app).post("/api/user/login/user").send(data);

      expect(res.status).toBe(400);
    });

    it("give 404 status when no user found in given email", async () => {
      const data = {
        email: "wrongemail@gmail.com",
        password: 123456,
      };
      const res = await request(app).post("/api/user/login/user").send(data);

      expect(res.status).toBe(404);
    });

    it("give 401 status when username and password does not matches", async () => {
      const data = {
        email: staffEmail,
        password: "wrongpassword",
      };
      const res = await request(app).post("/api/user/login/user").send(data);

      expect(res.status).toBe(401);
    });

    it("give 200 status when username and password matches", async () => {
      const data = {
        email: staffEmail,
        password,
      };
      const res = await request(app).post("/api/user/login/user").send(data);

      expect(res.status).toBe(200);
    });
  });

  describe("api/user/register/customer", () => {

    beforeEach(() => {
      app = require("../../main");
    });
  
    afterEach(() => {
      app.close();
    });

    it("give 400 status when no input is given", async () => {
      const data = {};
      const res = await request(app).post("/api/user/register/customer").send(data);

      expect(res.status).toBe(400);
    });

    it("give 400 status inputs are not valid", async () => {
      const data = {
        email: "wrongemailgmailcom",
        password: 123456,
        firstName: "John",
        lastName: "Doe",
        mobileNumber : 774531987,
      };
      const res = await request(app).post("/api/user/register/customer").send(data);

      expect(res.status).toBe(400);
    });

    it("give 200 status when all the inputs are valid", async () => {
      const data = {
        email: "test1@gmail.com",
        password: '123456',
        firstName: "John",
        lastName: "Doe",
        mobileNumber : 774531987,
      };
      const res = await request(app).post("/api/user/register/customer").send(data);

      expect(res.status).toBe(200);
    });

    
  });
});
