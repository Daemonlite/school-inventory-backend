import {
    register,
    login,
    getAllUsers
} from "../controllers/userController.js";
import verifyToken from "../middlewares/verify.js";

import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users",verifyToken, getAllUsers);

export default router;