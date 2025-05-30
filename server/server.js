import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userAuthController from "./routes/auth.routes.js";
import sellerAuthController from "./routes/seller.auth.routes.js";
import sellerProductController from "./routes/product.route.js";
import generalProductController from "./routes/gen.prod.route.js";
import searchController from "./routes/search.route.js";
import cartController from "./routes/cart.route.js";
import wishlistController from "./routes/wishlist.route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = ["http://localhost:5173"];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  maxAge: 86400,
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/auth/user", userAuthController);
app.use("/auth/seller", sellerAuthController);
app.use("/seller", sellerProductController);
app.use("/products", generalProductController);
app.use("/search", searchController);
app.use("/cart", cartController);
app.use("/wishlist", wishlistController);

app.get("/", (req, res) => {
  res.json("Hello World!");
});

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Database is connected!");
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(PORT, () => {
  console.log(`Server is running in Port ${PORT}`);
});
