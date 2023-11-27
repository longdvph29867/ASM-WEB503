import { Router } from "express";
import imagesController from "../controllers/imagesController.js";
import cloudinary from "../utils/cloudinaryConfig.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

const routerImages = Router();
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "test-up-image",
    format: "png",
  },
});

const upload = multer({ storage });
routerImages.post(
  "/",
  upload.array("images", 10),
  imagesController.uploadImages
);
routerImages.delete(
  "/:publicId",
  upload.array("images", 10),
  imagesController.delete
);

export default routerImages;
