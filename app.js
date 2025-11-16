import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import connectDB from "./connectionDB.js";
import productRoutes from "./routes/product.js";
import mongoose from "mongoose";
import userRoutes from "./routes/users.js";
import orderRoutes from "./routes/orders.js";
import categoryRoutes from "./routes/categories.js";
import authJwt from "./auth/jwt.js";

dotenv.config();
const app = express();
const api = process.env.API_URL;


app.use(authJwt());
app.use(bodyParser.json());
app.use(`${api}products`, productRoutes);
app.use(`${api}users`, userRoutes);
app.use(`${api}orders`, orderRoutes);
app.use(`${api}categories`, categoryRoutes);
connectDB();





app.listen(3000, () => {
    console.log("Server running Successfully");
});