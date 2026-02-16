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


router.post("/create", verifyToken, createSales);
router.get("/sales", verifyToken, getAllSales);
router.get("/sales/:id", verifyToken, getSalesById);
router.get("/sales/user/:id", verifyToken, getSalesByUserId);
router.put("/update/:id", verifyToken, updateSales);
router.delete("/delete/:id", verifyToken, deleteSales);

export default router