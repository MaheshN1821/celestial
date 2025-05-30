import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  prodId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  quantitySelected: {
    type: Number,
  },
  storage: {
    type: String,
  },
  ram: {
    type: String,
  },
  color: {
    type: String,
  },
});

const Cart = mongoose.model("cart", cartSchema);

export default Cart;
