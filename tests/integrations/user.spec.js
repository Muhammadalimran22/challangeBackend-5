const supertest = require("supertest");
const app = require("../../app");
const request = require("supertest");
let user = {};

describe("test POST /api/v1/users endpoint", () => {
  test("test email belum terdaftar -> sukses", async () => {
    try {
      const user = user.id;
      const name = "usertest1";
      const email = "usertest1@mail.com";
      const password = "imran123";
      const identifyType = "KTP";
      const identifyNumber = "123456789";
      const address = "aceh";

      const { statusCode, body } = await request(app)
        .post("/api/v1/users")
        .send({
          name,
          email,
          password,
          identifyType,
          identifyNumber,
          address,
        });
      expect(statusCode).toBe(201);
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message", "id belum terdaftar");
      expect(body.data).toHaveProperty("id");
      expect(body.data).toHaveProperty("name");
      expect(body.data).toHaveProperty("email");
      expect(body.data).toHaveProperty("password");
      expect(body.data).toHaveProperty("identifyType");
      expect(body.data).toHaveProperty("identifyNumber");
      expect(body.data).toHaveProperty("address");
      expect(body.data.id).toBe(id);
      expect(body.data.name).toBe(name);
      expect(body.data.email).toBe(email);
      expect(body.data.password).toBe(password);
      expect(body.data.identifyType).toBe(identifyType);
      expect(body.data.identifyNumber).toBe(identifyNumber);
      expect(body.data.address).toBe(address);
    } catch (err) {
      expect(err).toBe(err);
    }
  });

  test("test email sudah terdaftar -> error", async () => {
    try {
      const name = "usertest1";
      const email = "usertest1@mail.com";
      const password = "imran123";
      const identifyType = "KTP";
      const identifyNumber = "123456789";
      const address = "aceh";

      const response = await request(app).post("/api/v1/users").send({
        name,
        email,
        password,
        identifyType,
        identifyNumber,
        address,
      });

      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("message", "email sudah dipakai");
    } catch (err) {
      expect(err).toBe(err);
    }
  });
});

describe("test GET /api/v1/users endpoint", () => {
  test("test get all -> success", async () => {
    try {
      const { statusCode, body } = await request(app).get("/api/v1/users");

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message", "succes menampilkan semua data");
      expect(body).toHaveProperty("data");
    } catch (err) {
      expect(err).toBe(err);
    }
  });
});

describe("test GET /api/v1/users/{id} endpoint", () => {
  test("test cari user dengan id yang terdaftar -> sukses", async () => {
    try {
      const userId = user.id;
      const { statusCode, body } = await request(app).get(
        `/api/v1/users/${userId}`
      );

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message", "succes");
      expect(body).toHaveProperty("data");
      expect(body.data).toHaveProperty("id");
      expect(body.data).toHaveProperty("name");
      expect(body.data).toHaveProperty("email");
      expect(body.data).toHaveProperty("password");
      expect(body.data).toHaveProperty("identifyType");
      expect(body.data).toHaveProperty("identifyNumber");
      expect(body.data).toHaveProperty("address");
      expect(body.data.id).toBe(user.id);
      expect(body.data.name).toBe(user.name);
      expect(body.data.email).toBe(user.email);
      expect(body.data.password).toBe(user.password);
      expect(body.data.identifyType).toBe(user.identifyType);
      expect(body.data.identifyNumber).toBe(user.identifyNumber);
      expect(body.data.address).toBe(user.address);
    } catch (err) {
      expect(err).toBe(err);
    }
  });

  test("test cari user dengan id yang tidak terdaftar -> error", async () => {
    try {
      const { statusCode, body } = await request(app).get(
        `/api/v1/users/${user.id + 0}`
      );

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message", "id tidak terdaftar");
    } catch (err) {
      expect(err).toBe(err);
    }
  });
});
