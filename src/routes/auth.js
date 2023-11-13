import { Router } from "express";
import authController from "../controllers/authController.js";

const routerAuth = Router();
routerAuth.post("/register", authController.signUp);
routerAuth.post("/login", authController.signIn);
export default routerAuth;
