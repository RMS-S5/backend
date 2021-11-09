// const request = require("supertest");
// const jwt = require("jsonwebtoken");
// import { TokenMan } from "../../src/utils/tokenMan";
// import { v4 as UUID } from "uuid";
// import * as payloads from "../../src/utils/testing/payloads";

// let app: any;

// jest.setTimeout(60000);

// describe("api/branch", () => {

//   describe("api/branch/branches GET", () => {

//     beforeEach(() => {
//       app = require("../../src/main");

//     });

//     afterEach(() => {
//       app.close();
//     });

//     it("should give 200 when it return all branches", async () => {
//       const accessToken = TokenMan.getAccessToken(payloads.managerPayload);
//       const res = await request(app).get("/api/branch/branches")
//         .auth(accessToken, { type: 'bearer' });

//       expect(res.status).toBe(200);
//     });

//     // it("should give 500 when token is invalid", async () => {
//     //   const { userId, ...temp } = payloads.managerPayload;
//     //   const data = {userId : UUID(), ...temp};
//     //   const accessToken = TokenMan.getAccessToken(data);
//     //   const res = await request(app).get("/api/branch/branches")
//     //     .auth(accessToken, { type: 'bearer' });

//     //   expect(res.status).toBe(500);
//     // });
//   });

//   describe("api/branch/add-branch", () => {

//     beforeEach(() => {
//       app = require("../../src/main");
//     });

//     afterEach(() => {
//       app.close();
//     });

//     it("should give 400 status when branch name is invalid", async () => {
//       const accessToken = TokenMan.getAccessToken(payloads.managerPayload);
//       const data = {}; //todo: check for invalid values

//       const res = await request(app).post("/api/branch/add-branch")
//         .auth(accessToken, { type: 'bearer' })
//         .send(data);

//       expect(res.status).toBe(400);
//     });

//     it("should give 200 status when a branch is added", async () => {
//       const accessToken = TokenMan.getAccessToken(payloads.managerPayload);
//       const data = {
//         branchName: "test branch name"
//       };
//       const res = await request(app).post("/api/branch/add-branch")
//         .auth(accessToken, { type: 'bearer' })
//         .send(data);

//       expect(res.status).toBe(200);
//     });
//   });

//   describe("api/branch/remove-branch", () => {

//     beforeEach(() => {
//       app = require("../../src/main");
//     });

//     afterEach(() => {
//       app.close();
//     });

//     it("should give 500 status when branch id is not found", async () => {
//       const accessToken = TokenMan.getAccessToken(payloads.managerPayload);
//       const branchId = "falseId";
//       const path = "/api/branch/remove-branch/" + branchId;

//       const res = await request(app).put(path)
//         .auth(accessToken, { type: 'bearer' });

//       expect(res.status).toBe(500);
//     });

//     it("should give 200 status when a branch is removed", async () => {
//       const accessToken = TokenMan.getAccessToken(payloads.managerPayload);
//       const branchId = "0043ce01-d2b5-46b5-8ef1-96b40245d766" //todo:remove hardcoded value
//       const path = "/api/branch/remove-branch/" + branchId;

//       const res = await request(app).put(path)
//         .auth(accessToken, { type: 'bearer' });

//       expect(res.status).toBe(200);
//     });
//   });
// });
