import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./route/user.js";
import authRouter from "./route/auth.js";
import workRouter from "./route/work.js";
import siteItemRouter from "./route/site-item.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { mongoBDConnect } from "./config/db.js";

// initialization
const app = express();
dotenv.config();

app.use("/public", express.static("public"));

// set middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

// set environment vars
const PORT = process.env.PORT || 9090;

// routing
app.use("/api/v1/user", userRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/work", workRouter);
app.use("/api/v1/site-item", siteItemRouter);

// use error handler
app.use(errorHandler);

// app listen
app.listen(PORT, () => {
    mongoBDConnect();
    console.log(`\nserver is running on port http://localhost:${PORT}`);
});
