const express = require("express");
const app = express();

const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const bcrypt = require("bcrypt");

const userRouter = require("./routers/users");
const authRouter = require("./routers/auth");

dotenv.config();

mongoose
  .connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Monogo db database connected");
  });

// Add middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.get("/user", (req, res) => {
  res.send("hello user");
});

app.use("/backend/api/users", userRouter);
app.use("/backend/api/auth", authRouter);

app.listen(8200, () => {
  console.log("app is running on " + 8200);
});
