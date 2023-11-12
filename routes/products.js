import { Router } from "express";
import ProductsCotroller from "../controllers/ProductsCotroller.js";

const routerProduct = Router();
routerProduct.get('/', ProductsCotroller.getAllProducts)
routerProduct.get('/:slug', ProductsCotroller.getDetailProduct)
export default routerProduct;