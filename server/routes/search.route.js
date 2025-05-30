import express from "express";
import handleSearch from "../controllers/search.contoller.js";

const router = express.Router();

router.post("/prod", handleSearch);

export default router;
