import express from "express";
import { genProductController } from "../controllers/gen.prod.controller.js";

const router = express.Router();

router.get("/get-products", genProductController);

export default router;
