import Product from "../models/product.js";

const handleSearch = async (req, res) => {
  const data = req?.body?.toSearch;
  try {
    const keywords = data.split(" ");
    const query = {
      $and: keywords.map((word) => ({
        $or: [
          { name: { $regex: word, $options: "i" } },
          { brand: { $regex: word, $options: "i" } },
          { storage: { $regex: word, $options: "i" } },
          { colors: { $regex: word, $options: "i" } },
          { ram: { $regex: word, $options: "i" } },
          { description: { $regex: word, $options: "i" } },
        ],
      })),
    };

    const products = await Product.find(query);
    // console.log(products);

    if (!products) {
      return res.status(204).json({ message: "No products available!" });
    }

    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Try again later!" });
  }
};

export default handleSearch;
