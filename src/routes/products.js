import { Router } from "express";
import productsController from "../controllers/productsController.js";

const routerProduct = Router();
routerProduct.get("/", productsController.getAll);
routerProduct.get("/:slug", productsController.getDetail);
routerProduct.post("/", productsController.create);
routerProduct.put("/:slug", productsController.update);
routerProduct.delete("/:id", productsController.delete);
export default routerProduct;
