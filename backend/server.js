import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
//utilities
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

const port = process.env.PORT || 5000;
connectDB();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.listen(port, () => console.log("server is  on  port", port));
