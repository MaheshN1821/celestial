import Wishlist from "../models/wishlist.js";

const handleWishlistAdd = async (req, res) => {
  const data = req.body;
  try {
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Try again later!" });
  }
};

export { handleWishlistAdd };
