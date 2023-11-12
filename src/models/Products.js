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
    image: {
      type: String,
      maxLength: 255,
    },
    price: {
      type: Number,
    },
    slug: {
      type: String,
      maxLength: 255,
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
  }
);
const Products = mongoose.model("Products", productsSchema);

export default Products;
