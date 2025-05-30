import mongoose from "mongoose";

const wishSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  prodId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Wishlist = mongoose.model("wishlist", wishSchema);

export default Wishlist;
