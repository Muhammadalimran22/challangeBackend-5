const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { getPagination } = require("../libs/pagination.libs");

module.exports = {
  getAllUser: async (req, res, next) => {
    try {
      let users = await prisma.user.findMany({
        include: {
          profile: true,
          // BankAccount: true,
        },
        orderBy: {
          id: "asc",
        },
      });
      res.status(201).json({
        status: true,
        message: "all users",
        data: users,
      });
    } catch (err) {
      next(err);
    }
  },

  getDetailUser: async (req, res, next) => {
    try {
      let { userId } = req.params;

      let user = await prisma.user.findUnique({
        where: {
          id: Number(userId),
        },
        include: {
          profile: true,
          // BankAccount: true,
        },
      });

      if (!user) {
        return res.status(400).json({
          status: false,
          message: "user ga ada",
          data: null,
        });
      }

      res.status(200).json({
        status: true,
        message: "OK",
        data: user,
      });
    } catch (err) {
      next(err);
    }
  },

  getPaginationUser: async (req, res, next) => {
    try {
      let { limit = 10, page = 1 } = req.query;
      limit = Number(limit);
      page = Number(page);

      let users = await prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
        include: {
          profile: true,
          // BankAccount: true,
        },
        orderBy: {
          id: "asc",
        },
      });
      let { _count } = await prisma.user.aggregate({
        _count: { id: true },
      });

      let pagination = getPagination(req, _count.id, page, limit);

      res.status(200).json({
        status: true,
        message: "OK",
        data: { pagination, users },
      });
    } catch (err) {
      next(err);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      let userId = parseInt(req.params.userId);
      let { name, email, password, profile } = req.body;

      let updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          name,
          email,
          password,
          profile: {
            create: profile,
          },
        },
        include: { profile: true },
      });

      res.status(200).json({
        status: true,
        message: "data pengguna dan profile update succes",
        data: updatedUser,
      });
    } catch (err) {
      next(err);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      let { userId } = req.params;
      const deletedUser = await prisma.user.delete({
        where: { id: Number(userId) },
      });

      res.status(200).json({
        status: true,
        message: "delete successful",
        data: deletedUser,
      });
    } catch (err) {
      next(err);
    }
  },
};
