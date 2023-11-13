import Categories from "../models/Categories.js";

class CategoriesCotroller {
  async getAll(req, res) {
    try {
      const categories = await Categories.find();
      res.status(200).json({ data: categories });
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }
}

export default new CategoriesCotroller();
