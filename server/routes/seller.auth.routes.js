import express from "express";
import {
  registerController,
  loginController,
  logoutController,
  onBoardController,
} from "../controllers/seller.auth.controller.js";

const router = express.Router();

router.post("/register", registerController);

router.post("/onboard", onBoardController);

router.post("/login", loginController);

router.get("/logout", logoutController);

export default router;
