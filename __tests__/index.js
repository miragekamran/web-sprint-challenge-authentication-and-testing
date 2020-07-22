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
        expect(login.type).toBe("application/json");
        expect(res.body).toHaveLength(3);
        expect(res.body[1].username).toBe("johndoe");
    });

    it("tests register endpoint", async () => {
        const reg = await supertest(server).post("/api/auth/register").send({
            username: "janedoe",
            password: "abc12345"
        });
        expect(reg.statusCode).toBe(409);
        expect(reg.type).toBe("application/json");
        // expect(reg.body.username).toBe("janedoe");
        // expect(reg.body.password).toBeDefined();
    });

    it("tests login endpoint", async () => {
        const login = await supertest(server).post("/api/auth/login").send({
            username: "test",
            password: "abc12345"
        });
        expect(login.statusCode).toBe(401);
        expect(login.type).toBe("application/json");
        expect(login.body.message).toBe("Invalid Credentials");
        // expect(login.body.id).toBeDefined();
        // expect(login.body.username).toBe("janedoe");
        // expect(login.body.password).toBeDefined();
    });

    it("GET jokes", () => {
        return supertest(server)
            .get("/api/jokes")
            .then(res => {
                expect(res.type).toMatch(/json/i);
            });
    });
});
