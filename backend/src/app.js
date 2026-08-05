const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

const authRoutes = require("./routes/auth.routes");
const categoryRoutes = require("./routes/category.routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "OnePool Marketplace API Running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);

module.exports = app;