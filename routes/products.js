import { Router } from "express";
import ProductsCotroller from "../controllers/ProductsCotroller.js";

const routerProduct = Router();
routerProduct.get('/', ProductsCotroller.getAllProducts)
export default routerProduct