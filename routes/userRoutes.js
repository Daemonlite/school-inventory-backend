import {
    register,
    login,
    getAllUsers,
    updateUser,
    deleteUser
} from "../controllers/userController.js";
import verifyToken from "../middlewares/verify.js";

import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/",verifyToken, getAllUsers);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;