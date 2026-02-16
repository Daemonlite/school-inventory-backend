import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connect.js";
import userRoutes from "./routes/userRoutes.js";     
import ProductCategoryRoutes from "./routes/ProductCategoryRoutes.js";
import ProductRoutes from "./routes/ProductRoutes.js";
import SalesRoutes from "./routes/SalesRoutes.js";

const app = express();

dotenv.config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//database connection
connectDB();

app.use("/api/users", userRoutes);
app.use("/api/categories", ProductCategoryRoutes);
app.use("/api/products", ProductRoutes);
app.use("/api/sales", SalesRoutes);



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});