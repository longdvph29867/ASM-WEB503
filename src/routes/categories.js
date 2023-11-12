import { Router } from "express";
import categoriesController from "../controllers/categoriesController.js";

const routerCategory = Router();
routerCategory.get("/", categoriesController.getAll);
export default routerCategory;
