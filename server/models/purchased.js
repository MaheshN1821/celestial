import mongoose from "mongoose";

const purchasedSchema = new mongoose.Schema({
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

const Purchased = mongoose.model("purchased", purchasedSchema);

export default Purchased;
