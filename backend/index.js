const express = require("express");
const app = express();

const morgan = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const bcrypt = require("bcrypt");
const cors = require("cors"); // ← ADD THIS LINE

const userRouter = require("./routers/users");
const authRouter = require("./routers/auth");
const postRouter = require("./routers/post");
const commentRouter = require("./routers/comment");

dotenv.config();

// MongoDB Connection
mongoose
  .connect(process.env.MONGOOSE_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("MongoDB database connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from Next.js
    credentials: true, // Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Other middleware
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" }, // Allow images
  })
);
app.use(express.urlencoded({ extended: true }));

// Add middleware
app.use(express.json());
// app.use(helmet());
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false,
  })
);

app.use(morgan("common"));
// app.use("/uploads", express.static("uploads"));
app.use(
  "/uploads",
  express.static("uploads", {
    setHeaders: (res, path) => {
      res.set("Cross-Origin-Resource-Policy", "cross-origin");
      res.set("Access-Control-Allow-Origin", "*");
    },
  })
);
app.use("/backend/api/auth", authRouter);
app.use("/backend/api/users", userRouter);
app.use("/backend/api/posts", postRouter);
app.use("/backend/api/posts/comment", commentRouter);

app.listen(8200, () => {
  console.log("app is running on " + 8200);
});
