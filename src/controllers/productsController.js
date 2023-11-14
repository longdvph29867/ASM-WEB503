import slugify from "slugify";
import Products from "../models/Products.js";
import { productValid } from "../validations/products.js";

class ProductsCotroller {
  async getAll(req, res) {
    try {
      let products;
      if (req.query.gender) {
        products = await Products.find({ gender: req.query.gender });
      } else {
        products = await Products.find();
      }

      res.status(200).json({
        message: "Lấy dữ liệu thành công!",
        data: products,
      });
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
      res.status(200).json({
        message: "Lấy dữ liệu thành công!",
        data: product,
      });
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }

  async create(req, res) {
    try {
      // validation
      const { error } = productValid.validate(req.body);
      if (error) {
        res.status(400).json({
          message: error.details.map((error) => error.message),
        });
        return;
      }

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

  async update(req, res) {
    try {
      // validation
      const { error } = productValid.validate(req.body);
      if (error) {
        res.status(400).json({
          message: error.details.map((error) => error.message),
        });
        return;
      }

      const data = { ...req.body };
      data.slug = slugify(data.name, { lower: true });

      const productExists = await Products.findOne({
        slug: data.slug,
        _id: { $ne: req.params.id },
      });
      if (productExists) {
        return res.status(404).json({
          message: "Sản phẩm đã tồn tại",
        });
      }

      const product = await Products.findByIdAndUpdate(req.params.id, data, {
        new: true,
      });
      if (!product) {
        return res.status(404).json({
          message: "Cập nhật sản phẩm thất bại",
        });
      }

      return res.status(200).json({
        message: "Cập nhật sản phẩm thành công",
        data: product,
      });
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const data = await Products.findByIdAndDelete(req.params.id);
      if (!data) {
        return res.status(400).json({
          message: "Xoá thất bại!",
        });
      }
      return res.status(200).json({
        messgae: "Xoá thành công!",
        data: data,
      });
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }
}

export default new ProductsCotroller();
