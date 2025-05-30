import Product from "../models/product.js";

const genProductController = async (req, res) => {
  try {
    const result = await Product.find();
    // console.log(result);

    if (!result) {
      return res.status(500).json({ error: "Try again later!" });
    }

    return res.status(200).json({ prodData: result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Try again later!" });
  }
};

export { genProductController };
