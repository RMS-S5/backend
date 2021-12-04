const request = require("supertest");
const jwt = require("jsonwebtoken");
import { TokenMan } from "../../src/utils/tokenMan";
import model, { MErr } from "../../src/model";
import { MErrorCode } from "../../src/utils/dbMan/merror";
import { v4 as UUID } from "uuid";
import * as payloads from "../../src/utils/testing/payloads";

let app: any;

jest.setTimeout(60000);

describe("api/room functions", () => {
    describe("api/room/rooms", () => {
        beforeEach(() => {
            app = require("../../src/main");
        });

        afterEach(() => {
            app.close();
        });

        it("Return rooms when no database error", async () => {
            const accessToken = TokenMan.getAccessToken(payloads.branchManagerPayload);
            model.room.get_Rooms = jest
                .fn()
                .mockReturnValueOnce(
                    new Promise((resolve, reject) => {
                        resolve([{ code: MErrorCode.NO_ERROR }, []]);
                    })
                );
            const res = await request(app)
                .get("/api/room/rooms")
                .auth(accessToken, { type: 'bearer' })
                .send();
            expect(res.status).toBe(200);
            expect(res.body.data).toBeDefined();
        });

        it("Return internal server error for database error", async () => {
            const accessToken = TokenMan.getAccessToken(payloads.branchManagerPayload);
            model.room.get_Rooms = jest
                .fn()
                .mockReturnValueOnce(
                    new Promise((resolve, reject) => {
                        resolve([{ code: MErrorCode.UNKNOWN }, null]);
                    })
                );
            const res = await request(app)
                .get("/api/room/rooms")
                .auth(accessToken, { type: 'bearer' })
                .send();
            expect(res.status).toBe(500);
        });
    });
});
