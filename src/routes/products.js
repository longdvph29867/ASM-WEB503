import { Router } from "express";
import productsController from "../controllers/productsController.js";
import { checkPermission } from "../middlewares/middlewares.js";

const routerProduct = Router();
routerProduct.get("/", productsController.getAll);
routerProduct.get("/:slug", productsController.getDetail);
routerProduct.post("/", checkPermission, productsController.create);
routerProduct.put("/:slug", checkPermission, productsController.update);
routerProduct.delete("/:id", checkPermission, productsController.delete);
export default routerProduct;
