import cloudinary from "../utils/cloudinaryConfig.js";

class ImagesController {
  async uploadImages(req, res) {
    try {
      const images = req.files.map((file) => file.path);
      const uploadedImages = [];

      for (let image of images) {
        const results = await cloudinary.uploader.upload(image);
        uploadedImages.push({
          url: results.secure_url,
          publicId: results.public_id,
        });
      }

      return res.status(200).json({
        message: "Thêm ảnh thành công",
        datas: uploadedImages,
      });
    } catch (error) {
      res.status(500).json({
        name: error.name,
        message: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const publicId = req.params.publicId;
      const results = await cloudinary.uploader.destroy(publicId);

      if (results.result === "not found") {
        throw new Error("Xoá ảnh thất bại!");
      }

      return res.status(200).json({
        message: "Xoá ảnh thành công!",
      });
    } catch (err) {
      res.status(500).json({
        name: err.name,
        message: err.message,
      });
    }
  }
}

export default new ImagesController();
