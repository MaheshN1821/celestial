import express from "express";
import { handleWishlistAdd } from "../controllers/wishlist.controller.js";

const router = express.Router();

router.post("/add-prod", handleWishlistAdd);

export default router;
