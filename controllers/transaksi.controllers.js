const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

module.exports = {
  createTransaksi: async (req, res, next) => {
    try {
      let { sourceAccountId, destinasiAccountId, amount } = req.body;

      // validasi akun sumber dan tujuan
      let sourceAccount = await prisma.bankAccount.findUnique({
        where: {
          id: sourceAccountId,
        },
      });

      let destinasiAccount = await prisma.bankAccount.findUnique({
        where: {
          id: destinasiAccountId,
        },
      });

      if (!sourceAccount || !destinasiAccount) {
        return res.status(400).json({
          status: false,
          message: "destinasi account tidak ada",
          data: null,
        });
      }

      // validasi saldo akunnya
      if (sourceAccount.balance < amount) {
        return res.status(400).json({
          status: false,
          message: "gabener balancenya",
          data: null,
        });
      }

      let createTransaction = await prisma.transaksi.create({
        data: {
          sourceAccountId,
          destinasiAccountId,
          amount,
        },
      });

      // mengupdate
      await prisma.bankAccount.update({
        where: {
          id: sourceAccountId,
        },
        data: {
          balance: {
            decrement: amount,
          },
        },
      });

      await prisma.bankAccount.update({
        where: {
          id: destinasiAccountId,
        },
        data: {
          balance: {
            increment: amount,
          },
        },
      });

      res.status(200).json({
        status: true,
        message: "transaksi sukses",
        data: createTransaction,
      });
    } catch (err) {
      next(err);
    }
  },

  getAllTransaksi: async (req, res, next) => {
    try {
      let transactions = await prisma.transaksi.findMany();

      res.status(200).json({
        status: true,
        message: "OK",
        data: transactions,
      });
    } catch (err) {
      next(err);
    }
  },

  getDetailTransaksi: async (req, res, next) => {
    try {
      let { transactionId } = req.params;

      let transaction = await prisma.transaksi.findUnique({
        where: {
          id: Number(transactionId),
        },
      });

      if (!transaction) {
        return res.status(404).json({
          status: false,
          message: "transaksi not found",
          data: null,
        });
      }

      res.status(200).json({
        status: true,
        message: "OK",
        data: transaction,
      });
    } catch (err) {
      next(err);
    }
  },
};
