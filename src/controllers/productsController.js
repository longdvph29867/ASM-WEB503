import slugify from "slugify";
import Products from "../models/Products.js";

class ProductsCotroller {
  async getAll(req, res) {
    try {
      const products = await Products.find();
      res.status(200).json({ data: products });
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }

  async getDetail(req, res) {
    try {
      const product = await Products.findOne({ slug: req.params.slug });
      res.status(200).json({ data: product });
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }

  async create(req, res) {
    try {
      const data = { ...req.body };
      data.slug = slugify(data.name, { lower: true });

      const productExists = await Products.findOne({ slug: data.slug });
      if (productExists) {
        res.status(404).json({
          message: "Sản phẩm đã tồn tại",
        });
        return;
      }
      const product = await Products.create(data);
      if (!product) {
        res.status(404).json({
          message: "Tạo sản phẩm thất bại",
        });
        return;
      }
      res
        .status(200)
        .json({ message: "Tạo sản phẩm thành công!", newProduct: product });
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }
}

export default new ProductsCotroller();
