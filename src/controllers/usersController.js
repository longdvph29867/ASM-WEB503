import Users from "../models/Users.js";
import bcryptjs from "bcryptjs";
import { userUpdateValid, userValid } from "../validations/users.js";
class UsersCotroller {
  async getAll(req, res) {
    try {
      const users = await Users.find();
      res.status(200).json({
        message: "Lấy dữ liệu thành công!",
        data: users,
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
      const user = await Users.findById(req.params.id);
      if (!user) {
        res.status(404).json({
          message: "Không tìm thấy tài khoản!",
        });
        return;
      }
      res.status(200).json({
        message: "Lấy tài khoản thành công!",
        data: user,
      });
    } catch (err) {
      res.status(500).json({
        message: "Lỗi trong quá trình lấy dữ liệu!",
      });
    }
  }

  async create(req, res) {
    try {
      const { error } = userValid.validate(req.body);
      if (error) {
        res.status(400).json({
          message: error.details.map((item) => item.message),
        });
        return;
      }

      const data = { ...req.body };

      const userExists = await Users.findOne({ account: data.account });
      if (userExists) {
        res.status(404).json({
          message: "Tài khoản đã tồn tại!",
        });
        return;
      }

      const userExistsPhone = await Users.findOne({
        phoneNumber: data.phoneNumber,
      });
      if (userExistsPhone) {
        res.status(404).json({
          message: "Số điện thoại đã được đăng ký!",
        });
        return;
      }

      const hashedPassword = await bcryptjs.hash(data.password, 10);

      const user = await Users.create({ ...data, password: hashedPassword });
      if (!user) {
        res.status(404).json({
          message: "Tạo tài khoản thất bại!",
        });
        return;
      }

      res.status(200).json({
        message: "Tạo tài khoản thành công!",
        data: user,
      });
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }

  async update(req, res) {
    try {
      const { error } = userUpdateValid.validate(req.body);
      if (error) {
        res.status(400).json({
          message: error.details.map((item) => item.message),
        });
        return;
      }
      const data = { ...req.body };

      const userExists = await Users.findOne({
        account: data.account,
        _id: { $ne: req.params.id },
      });
      if (userExists) {
        res.status(404).json({
          message: "Tài khoản đã tồn tại!",
        });
        return;
      }

      const userExistsPhone = await Users.findOne({
        phoneNumber: data.phoneNumber,
        _id: { $ne: req.params.id },
      });
      if (userExistsPhone) {
        res.status(404).json({
          message: "Số điện thoại đã được đăng ký!",
        });
        return;
      }
      const hashedPassword = await bcryptjs.hash(data.password, 10);

      const user = await Users.findByIdAndUpdate(
        req.params.id,
        { ...data, password: hashedPassword },
        { new: true }
      );
      if (!user) {
        res.status(404).json({
          message: "Cập nhật tài khoản thất bại!",
        });
        return;
      }

      res.status(200).json({
        message: "Cập nhật tài khoản thành công!",
        data: user,
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
      const data = await Users.findByIdAndDelete(req.params.id);
      if (!data) {
        res.status(400).json({
          message: "Xoá thất bại!",
        });
        return;
      }
      res.status(200).json({
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

export default new UsersCotroller();
