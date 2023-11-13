import { Router } from "express";
import usersController from "../controllers/usersController.js";

const routerUser = Router();
routerUser.get("/", usersController.getAll);
routerUser.get("/:id", usersController.getDetail);
routerUser.post("/", usersController.create);
routerUser.put("/", usersController.update);
routerUser.delete("/:id", usersController.delete);
export default routerUser;
