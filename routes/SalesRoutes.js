import verifyToken from "../middlewares/verify.js";

import express from "express";

const router = express.Router();

import {
    createSales,
    getAllSales,
    getSalesById,
    getSalesByUserId,
    updateSales,
    deleteSales
} from "../controllers/SalesController.js"


router.post("/", verifyToken, createSales);
router.get("/", verifyToken, getAllSales);
router.get("/:id", verifyToken, getSalesById);
router.get("/user/:id", verifyToken, getSalesByUserId);
router.put("/:id", verifyToken, updateSales);
router.delete("/:id", verifyToken, deleteSales);

export default router