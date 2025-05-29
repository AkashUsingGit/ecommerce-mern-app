import express from "express";
import dotenv from "dotenv";
import dbConnect from "./src/Database/dbConnection.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from 'cookie-parser';
import { apiError } from "./src/Utils/apiError.js";



dotenv.config();

const app = express();

app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173", // Your frontend URL
  credentials: true // Allow credentials (cookies, tokens)
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Define __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'product-images' folder
app.use('/product-images', express.static(path.join(__dirname, 'public', 'product-images')));

const errorHandler = (err, req, res, next) => {
    if (err instanceof apiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
            data: err.data,
        });
    }

    console.error(err.stack);
    return res.status(500).json({ message: 'Something went wrong' });
};

// Use this middleware after routes
app.use(errorHandler);


const PORT = 4000;

dbConnect()
  .then(() => {
    app.listen(PORT, () => {
    });
  })
  .catch(() => {
  });

import productRoute from "./src/Routers/productRoute.js";
import userRoute from "./src/Routers/userRoute.js"
import reviewRoute from "./src/Routers/reviewRoute.js"
import cartRoute from "./src/Routers/cartRoute.js"
import checkoutRoute from "./src/Routers/checkoutRoute.js"
import orderRoute from "./src/Routers/orderRoute.js"


app.use("/api/v1/product", productRoute);
app.use("/api/v1/user",userRoute)
app.use("/api/v1/review",reviewRoute)
app.use("/api/v1/cart",cartRoute)
app.use("/api/v1/checkout",checkoutRoute)
app.use("/api/v1/order",orderRoute)

app.use(errorHandler);
