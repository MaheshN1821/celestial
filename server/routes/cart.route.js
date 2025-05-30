import express from "express";
import { handleCartAdd } from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/add-prod", handleCartAdd);

export default router;
