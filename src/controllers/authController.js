import Users from "../models/Users.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
class AuthCotroller {
  async signUp(req, res) {
    try {
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

  async signIn(req, res) {
    try {
      const data = { ...req.body };

      const user = await Users.findOne({ account: data.account });
      if (!user) {
        res.status(404).json({
          message: "Tài khoản chưa được đăng ký!",
        });
        return;
      }

      const isMath = await bcryptjs.compare(data.password, user.password);
      if (!isMath) {
        res.status(404).json({
          message: "Mật khẩu không đúng!",
        });
        return;
      }

      const accessToken = await jwt.sign({ id: user.id }, "dovanlong", {
        expiresIn: "30d",
      });
      user.password = undefined;
      res.status(200).json({
        message: "Đăng nhập thành công!",
        data: user,
        accessToken,
      });
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }
}

export default new AuthCotroller();
