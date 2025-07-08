import express from "express";
import { sendMessage } from "../controller/messageController.js";

const router = express.Router();

router.post("/send", sendMessage); // <-- Make sure this exists

export default router;
