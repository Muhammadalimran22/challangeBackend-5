const app = require("../../app");
const request = require("supertest");
let transaction = {};

describe("test POST /api/v1/transaction endpoint", () => {
  test("test transaksi berhasil dibuat -> succes", async () => {
    try {
      const data = {
        sourceAccountId: 1,
        destinasiAccountId: 2,
        amount: 1000,
      };
      const response = await request(app)
        .post("/api/v1/transactions")
        .send(data);
      transaction = response.body.data;

      expect(statusCode).toBe(201);
      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("message");
      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("sourceAccountId");
      expect(response.body.data).toHaveProperty("destinasiAccountId");
      expect(response.body.data).toHaveProperty("amount");
      expect(response.body.data.sourceAccountId).toBe(data.sourceAccountId);
      expect(response.body.data.destinasiAccountId).toBe(
        data.destinasiAccountId
      );
      expect(response.body.data.amount).toBe(data.amount);
    } catch (err) {
      expect(err).toBe(err);
    }
  });

  test("test userId belum terdaftar -> error ", async () => {
    try {
      const data = {
        sourceAccountId: 0,
        destinasiAccountId: 0,
        amount: 0,
      };
      const response = await request(app)
        .post("/api/v1/transactions")
        .send(data);
      expect(response.statusCode).toBe(400);
      expect(response.body).toHaveProperty("status");
      expect(response.body).toHaveProperty("message", "transaksi tidak ada");
      expect(response.body).toHaveProperty("data");
    } catch (err) {
      expect(err).toBe(err);
    }
  });
});

describe("test GET /api/v1/transactions endpoint", () => {
  test("menampilkan semua data transaksi -> done.", async () => {
    try {
      const { statusCode, body } = await request(app).get(
        "/api/v1/transactions"
      );

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message", "berhasil menampilkan data");
      expect(body).toHaveProperty("data");
    } catch (err) {
      expect(err).toBe(err);
    }
  });
});

describe("test GET /api/v1/transactions/{id} endpoint", () => {
  test("test mencari transaksi dengan ID yang terdaftar -> done.", async () => {
    try {
      const transactionId = transaction.id;
      const { statusCode, body } = await request(app).get(
        `/api/v1/transactions/${transactionId.id}`
      );

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message", "id terdaftar");
      expect(body).toHaveProperty("data");
      expect(body.data).toHaveProperty("sourceAccountId");
      expect(body.data).toHaveProperty("destinasiAccountId");
      expect(body.data).toHaveProperty("amount");
      expect(body.data.amount).toBe(data.amount);
      expect(body.data.sourceAccountId.bankName).toBe(data.bankName);
      expect(body.data.sourceAccountId.bankAccountNumber).toBe(
        data.bankAccountNumber
      );
      expect(body.data.sourceAccountId.balance).toBe(data.balance);
      expect(body.data.destinasiAccountId.bankName).toBe(data.bankName);
      expect(body.data.destinasiAccountId.bankAccountNumber).toBe(
        data.bankAccountNumber
      );
      expect(body.data.destinasiAccountId.balance).toBe(data.balance);
    } catch (err) {
      expect(err).toBe(err);
    }
  });

  test("test mencari transaksi dengan ID yang tidak terdaftar -> error", async () => {
    try {
      const { statusCode, body } = await request(app).get(
        `/api/v1/transactions/${transactionId + 0}`
      );

      expect(statusCode).toBe(400);
      expect(body).toHaveProperty("status");
      expect(body).toHaveProperty("message", "id tidak terdaftar");
    } catch (err) {
      expect(err).toBe(err);
    }
  });
});
