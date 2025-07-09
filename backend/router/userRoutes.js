import express from "express";
import { forgotPassword, getUser, getUserForPortfolio, login, logout, register, updatePassword, updateProfile } from "../controller/userController.js";
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

// router.put("/me/profile/update", isAuthenticated, updateProfile);
// router.put("/password/reset/:token", resetPassword);

export default router;