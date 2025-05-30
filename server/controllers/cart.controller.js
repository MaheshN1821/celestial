import Cart from "../models/cart.js";

const handleCartAdd = async (req, res) => {
  const data = req.body;
  try {
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Try again later!" });
  }
};

export { handleCartAdd };
