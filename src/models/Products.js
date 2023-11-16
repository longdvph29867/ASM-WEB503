import { number } from "joi";
import mongoose from "mongoose";

const productsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 255,
    },
    desc: {
      type: String,
      maxLength: 500,
    },
    images: [
      {
        type: String,
        maxLength: 255,
      },
    ],
    price: {
      type: Number,
    },
    gender: {
      type: String,
      maxLength: 25,
    },
    slug: {
      type: String,
      maxLength: 255,
    },
    rating: {
      type: Number,
      default: 0,
    },
    id_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Caregories",
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
    updateAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    collection: "Products",
    versionKey: false,
  }
);
const Products = mongoose.model("Products", productsSchema);

export default Products;
