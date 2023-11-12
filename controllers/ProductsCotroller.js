import Products from "../models/ProductsModel.js"

class ProductsCotroller {
  async getAllProducts(req, res) {
    try {
      const products = await Products.find()
      // res.json(products)
      res.render('home', {
        products: products.map(item => item.toObject())
      })
    } catch (error) {
      res.status(404).json({
        error
      })
    }
  }

  async getDetailProduct(req, res) {
    try {
      const product = await Products.findOne({slug: req.params.slug});
      res.render('product/detail', {
        product: product.toObject()
      })
    }
    catch(err) {
      res.status(404).json({
        err
      })
    }
  }

  async getCreateProduct(req, res) {
    try {
      const product = await Products.findOne({slug: req.params.slug});
      res.render('product/detail', {
        product: product.toObject()
      })
    }
    catch(err) {
      res.status(404).json({
        error
      })
    }
  }
}

export default new ProductsCotroller();