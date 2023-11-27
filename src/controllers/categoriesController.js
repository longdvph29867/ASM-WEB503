import Categories from "../models/Categories.js";
import { categoryValid } from "../validations/categories.js";
import slugify from "slugify";

class CategoriesController {
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

  async getDetail(req, res) {
    try {
      const category = await Categories.findOne({ slug: req.params.slug });
      res.status(200).json({
        message: "Lấy dữ liệu thành công!",
        data: category,
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
      const { error } = categoryValid.validate(req.body);
      if (error) {
        res.status(400).json({
          message: error.details.map((error) => error.message),
        });
        return;
      }

      const data = { ...req.body };
      data.slug = slugify(data.categoryName, { lower: true });

      const categoryExists = await Categories.findOne({
        slug: data.slug,
      });
      if (categoryExists) {
        res.status(404).json({
          message: "Danh mục đã tồn tại",
        });
        return;
      }
      const category = await Categories.create(data);
      if (!category) {
        res.status(404).json({
          message: "Tạo danh mục thất bại",
        });
        return;
      }
      res
        .status(200)
        .json({ message: "Tạo danh mục thành công!", newCategory: category });
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
      const { error } = categoryValid.validate(req.body);
      if (error) {
        res.status(400).json({
          message: error.details.map((error) => error.message),
        });
        return;
      }

      const data = { ...req.body };
      data.slug = slugify(data.categoryName, { lower: true });
      if (data.slug != req.params.slug) {
        const categoryExists = await Categories.findOne({
          slug: data.slug,
        });
        if (categoryExists) {
          res.status(404).json({
            message: "Danh mục đã tồn tại",
          });
          return;
        }
      }

      const category = await Categories.findOneAndUpdate(
        { slug: req.params.slug },
        data,
        {
          new: true,
        }
      );
      if (!category) {
        res.status(404).json({
          message: "Cập nhật danh mục thất bại",
        });
        return;
      }

      res.status(200).json({
        message: "Cập nhật danh mục thành công",
        data: category,
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
      const data = await Categories.findByIdAndDelete(req.params.id);
      if (!data) {
        return res.status(400).json({
          message: "Xoá thất bại!",
        });
      }
      return res.status(200).json({
        message: "Xoá thành công!",
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

export default new CategoriesController();
