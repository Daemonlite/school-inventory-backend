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

router.post("/", verifyToken, createProductCategory);
router.get("/", verifyToken, getAllProductCategories);
router.get("/:id", verifyToken, getProductCategoryById);
router.put("/:id", verifyToken, updateProductCategory);
router.delete("/:id", verifyToken, deleteProductCategory);

export default router;