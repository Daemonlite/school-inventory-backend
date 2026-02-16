import verifyToken from "../middlewares/verify.js";

import express from "express";

const router = express.Router()

import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from "../controllers/ProductController.js";


router.post("/create", verifyToken, createProduct);
router.get("/products", verifyToken, getAllProducts);
router.get("/product/:id", verifyToken, getProductById);
router.put("/update/:id", verifyToken, updateProduct);
router.delete("/delete/:id", verifyToken, deleteProduct);

export default router