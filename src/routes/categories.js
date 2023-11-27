import { Router } from "express";
import categoriesController from "../controllers/categoriesController.js";

const routerCategory = Router();
routerCategory.get("/", categoriesController.getAll);
routerCategory.get("/:slug", categoriesController.getDetail);
routerCategory.post("/", categoriesController.create);
routerCategory.put("/:slug", categoriesController.update);
routerCategory.delete("/:id", categoriesController.delete);

export default routerCategory;
