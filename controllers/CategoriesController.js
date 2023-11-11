import Categories from "../models/CategoriesModel.js";

class CaregoriesCotroller {
  async getAllCategories(req, res) {
    try {
      const categories = await Categories.find()
      // res.json(products)
      res.render('home', {
        categories: categories.map(item => item.toObject())
      })
    } catch (error) {
      res.status(404).json({
        error
      })
    }
  }
}

export default new CaregoriesCotroller();