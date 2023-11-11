import { Router } from "express";
import CategoriesController from "../controllers/CategoriesController.js";

const routerCategory = Router();
routerCategory.get('/', CategoriesController.getAllCategories)
export default routerCategory