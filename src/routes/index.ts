import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
} from "../controllers/usersController";
import auth from "../middlewares/auth";

const router: Router = Router();

router.post("/users", createUser);

router.get("/users", auth, getUsers);

router.get("/users/:id", getUserById);

router.delete("/users", deleteUser);

export default router;
