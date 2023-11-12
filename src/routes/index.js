import routerCategory from "./categories.js";

export default function routes(app) {
  app.use("/categories", routerCategory);
}
