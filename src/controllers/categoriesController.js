import Categories from "../models/Categories.js";

class CategoriesCotroller {
  async getAll(req, res) {
    try {
      const categories = await Categories.find();
      res.status(200).json({ data: categories });
      // res.json(products)
    } catch (error) {
      res.status(404).json({
        error,
      });
    }
  }
}

export default new CategoriesCotroller();
