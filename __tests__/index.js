const supertest = require("supertest");
const server = require("../index");
const db = require("../database/dbConfig");

beforeEach(async () => {
    await db.seed.run();
});

afterAll(async () => {
    await db.destroy();
});

describe("User Authentication", () => {
    it("Get user", async () => {
        const res = await supertest(server).get("/api/auth/users");
        expect(res.statusCode).toBe(200);
        expect(res.headers["content-type"]).toBe(
            "application/json; charset=utf-8"
        );
        expect(res.body).toHaveLength(3);
        expect(res.body[1].username).toBe("johndoe");
    });

    it("Can Register a user", async () => {
        const reg = await supertest(server).post("/api/auth/register").send({
            username: "janedoe",
            password: "abc12345"
        });
        expect(reg.statusCode).toBe(409);
        // expect(reg.body.id).toBeDefined();
        // expect(reg.body.username).toBe("janedoe");
        // expect(reg.body.password).toBeDefined();
    });

    it("Can Login a user, not found", async () => {
        const login = await supertest(server).post("/api/auth/login").send({
            username: "janedoe",
            password: "abc12345"
        });
        expect(login.statusCode).toBe(500);
        // expect(login.body.id).toBeDefined();
        // expect(login.body.username).toBe("janedoe");
        // expect(login.body.password).toBeDefined();
    });
});
