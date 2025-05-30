import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  isOverboarded: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: String,
  },
});

const sellerOnboardSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  businessName: {
    type: String,
  },
  businessType: {
    type: String,
  },
  gstNumber: {
    type: String,
  },
  panNumber: {
    type: String,
  },
  businessCategory: {
    type: String,
  },
  addressLine1: {
    type: String,
  },
  addressLine2: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  pincode: {
    type: String,
  },
  country: {
    type: String,
  },
  bankName: {
    type: String,
  },
  accountNumber: {
    type: String,
  },
  ifscCode: {
    type: String,
  },
  accountHolderName: {
    type: String,
  },
});

const seller = mongoose.model("seller", sellerSchema);
const sellerOnboard = mongoose.model("sellerOnboard", sellerOnboardSchema);

export { seller, sellerOnboard };
