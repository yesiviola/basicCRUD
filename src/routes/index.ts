import { Router } from "express";
import {
  createUser,
  deleteUsers,
  getUsers,
} from "../controllers/usersController";

const router: Router = Router();

router.post("/users", createUser);
router.get("/users", getUsers);

router.delete("/users", deleteUsers);

export default router;
