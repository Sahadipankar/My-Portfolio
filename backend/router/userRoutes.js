import express from "express";
import { forgotPassword, getUser, getUserForPortfolio, login, logout, register, resetPassword, updatePassword, updateProfile } from "../controller/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
router.get("/profile", isAuthenticated, getUser);
router.put("/update/profile", isAuthenticated, updateProfile);
router.put("/update/password", isAuthenticated, updatePassword);
router.get("/profile/portfolio", getUserForPortfolio);
router.post("/forgot/password", forgotPassword);
router.put("/reset/password/:token", resetPassword);

// router.put("/me/profile/update", isAuthenticated, updateProfile);

export default router;