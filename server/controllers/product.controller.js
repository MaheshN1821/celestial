import Product from "../models/product.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const AddProdController = async (req, res) => {
  const data = req.body;
  // console.log(data);

  try {
    const newProd = await Product.create({ ...data });

    const response = await newProd.save();

    if (!response) {
      return res.status(500).json({ error: "Try again later" });
    }
    return res.status(201).json({ result: response });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Try again later" });
  }
};

const UpdateProdController = async (req, res) => {
  const updatedData = req.body;
  const sellerId = updatedData?._id;
  try {
    const response = await Product.findByIdAndUpdate(sellerId, updatedData, {
      new: true,
    });
    if (!response) {
      return res.status(500).json({ error: "Try again later!" });
    }
    return res.status(200).json({ result: response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Try again later" });
  }
};

export { AddProdController, UpdateProdController };
