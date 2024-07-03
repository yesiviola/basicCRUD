import { Request, Response } from "express";
import {
  createUserService,
  getUsersService,
  deleteUserService,
  getUserByIdService,
} from "../services/usersService";

import { User } from "../entities/User";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, active, age } = req.body;
  const newUser: User = await createUserService({ name, email, active, age });
  res.status(201).json(newUser);
};

export const getUsers = async (req: Request, res: Response) => {
  const users: User[] = await getUsersService();
  res.status(200).json(users);
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user: User | null = await getUserByIdService(Number(id));
  res.status(200).json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.body;
  await deleteUserService(id);
  res.status(200).json({ message: "Eliminado correctamente" });
};
