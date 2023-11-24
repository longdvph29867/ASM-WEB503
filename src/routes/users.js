import { Router } from "express";
import usersController from "../controllers/usersController.js";
import { checkPermission } from "../middlewares/middlewares.js";

const routerUser = Router();
routerUser.get("/", usersController.getAll);
routerUser.get("/:id", usersController.getDetail);
routerUser.post("/", checkPermission, usersController.create);
routerUser.put("/:id", checkPermission, usersController.update);
routerUser.delete("/:id", checkPermission, usersController.delete);
export default routerUser;
