import verifyToken from "../middlewares/verify.js";

import express from "express";

const router = express.Router();

import {
    createProductCategory,
    getAllProductCategories,
    getProductCategoryById,
    updateProductCategory,
    deleteProductCategory
} from "../controllers/ProductCategoryController.js";

router.post("/create", verifyToken, createProductCategory);
router.get("/categories", verifyToken, getAllProductCategories);
router.get("/category/:id", verifyToken, getProductCategoryById);
router.put("/update/:id", verifyToken, updateProductCategory);
router.delete("/delete/:id", verifyToken, deleteProductCategory);

export default router;