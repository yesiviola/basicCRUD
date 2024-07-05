import { Router } from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
} from "../controllers/usersController";
import auth from "../middlewares/auth";

import { createVehicle, getVehicles } from "../controllers/vehiclesController";

const router: Router = Router();

router.post("/users", createUser);

router.get("/users", getUsers);

router.get("/users/:id", getUserById);

router.delete("/users", deleteUser);

router.post("/vehicles", createVehicle);

router.get("/vehicles", getVehicles);

export default router;
