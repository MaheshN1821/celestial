import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number, required: true },
  description: {
    type: String,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
  colors: {
    type: [String],
    required: true,
  },
  storage: {
    type: [String],
    required: true,
  },
  ram: {
    type: [String],
    required: true,
  },
  specifications: [
    {
      name: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
  features: {
    type: [String],
    required: true,
  },
  quantityAvailable: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
  },
  specs: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  additionalDescription1: {
    type: String,
  },
  additionalDescription2: {
    type: String,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  rating: { type: Number, required: true, default: 5 },
  img: {
    type: [String],
  },
  publicIds: {
    type: [String],
  },
});

const Product = mongoose.model("product", productSchema);

export default Product;
