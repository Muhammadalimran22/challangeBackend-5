const app = require("../../app");
const request = require("supertest");
let account = {};

describe("test POST /api/v1/accounts endpoint", () => {
  test("test userId sudah terdaftar -> succes", async () => {
    try {
      const data = {
        userId: 1,
        bankName: "BNI",
        bankAccountNumber: "123456789",
        balance: 5000.0,
      };
      const response = await request(app).post("/api/v1/accounts").send(data);
      account = response.body.data;

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("message", "id terdaftar");
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("userId");
      expect(response.body.data).toHaveProperty("bankName");
      expect(response.body.data).toHaveProperty("bankAccountNumber");
      expect(response.body.data).toHaveProperty("balance");
      expect(response.body.data.userId).toBe(data.userId);
      expect(response.body.data.bankName).toBe(data.bankName);
      expect(response.body.data.bankAccountNumber).toBe(data.bankAccountNumber);
      expect(response.body.data.balance).toBe(data.balance);
    } catch (err) {
      expect(err).toBe(err);
    }
  });

  test("test userId belum terdaftar -> succes ", async () => {
    try {
      const data = {
        userId: 0,
        bankName: "BCA",
        bankAccountNumber: "123456789",
        balance: 5000.0,
      };
      const response = await request(app).post("/api/v1/accounts").send(data);
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("message", "user belum mendaftar");
    } catch (err) {
      expect(err).toBe(err);
    }
  });
});

describe("test GET /api/v1/accounts endpoint", () => {
  test("test menampilkan semua data -> done", async () => {
    try {
      const { statusCode, body } = await request(app).get("/api/v1/accounts");

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message", "berhasil menampilkan data");
      expect(body).toHaveProperty("data");
    } catch (err) {
      expect(err).toBe(err);
    }
  });
});

describe("test GET /api/v1/accounts/{id} endpoint", () => {
  test("test cari account dengan id yang terdaftar -> done", async () => {
    try {
      const accountId = account.id;
      const { statusCode, body } = await request(app).get(
        `/api/v1/users/${accountId}`
      );

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message", "mencari id yang terdaftar");
      expect(body).toHaveProperty("data");
      expect(body.data).toHaveProperty("userId");
      expect(body.data).toHaveProperty("bankName");
      expect(body.data).toHaveProperty("bankAccountNumber");
      expect(body.data).toHaveProperty("balance");
      expect(body.data.userId).toBe(data.userId);
      expect(body.data.bankName).toBe(data.bankName);
      expect(body.data.bankAccountNumber).toBe(data.bankAccountNumber);
      expect(body.data.balance).toBe(data.balance);
    } catch (err) {
      expect(err).toBe(err);
    }
  });

  test("test cari account dengan id yang tidak terdaftar -> error", async () => {
    try {
      const { statusCode, body } = await request(app).get(
        `/api/v1/accounts/${account.id + 0}`
      );

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message", "id tidak terdaftar");
    } catch (err) {
      expect(err).toBe(err);
    }
  });
});
