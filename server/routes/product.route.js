import express from "express";
import {
  AddProdController,
  UpdateProdController,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/add-product", AddProdController);

router.post("/update-product", UpdateProdController);

export default router;
