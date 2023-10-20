const express = require("express");
const path = require("path");
const logger = require("morgan");
const authRouter = require("./routes/auth.routes");
const usersRouter = require("./routes/endpointv1.routes");
const swaggerUi = require("swagger-ui-express");
const app = express();
const YAML = require("yaml");

const fs = require("fs");
const file = fs.readFileSync("./apiDoc.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

app.use(logger("dev"));
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1", usersRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 404 error handling
app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: "Not Found",
    data: null,
  });
});

// 500 error handling
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    status: false,
    message: "Internal Server Error",
    data: err.message,
  });
});

module.exports = app;
