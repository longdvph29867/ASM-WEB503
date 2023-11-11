import routerCategory from "./categories.js";
import routerProduct from "./products.js";

export default function routes(app) {
  app.use('/products', routerProduct)
  app.use('/category', routerCategory)
}