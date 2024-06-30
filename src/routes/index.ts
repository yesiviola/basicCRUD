import { Router } from "express";
import {
  createUser,
  deleteUsers,
  getUsers,
} from "../controllers/usersController";
import auth from "../middlewares/auth";

const router: Router = Router();

router.post("/users", createUser);

router.get("/users", auth, getUsers);

router.delete("/users", deleteUsers);

export default router;
