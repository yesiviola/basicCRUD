import { AppDataSource } from "../config/data-source";
import UserRepository from "../repositories/UserRepository";
import UserDto from "../dto/UserDto";
import { User } from "../entities/User";
import { DeepPartial } from "typeorm";

// Función para crear un usuario
export const createUserService = async (userData: UserDto): Promise<User> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = userRepository.create(userData as DeepPartial<User>);
  return await userRepository.save(user);
};

// Función para obtener todos los usuarios
export const getUsersService = async (): Promise<User[]> => {
  const userRepository = AppDataSource.getRepository(User);
  const users = await userRepository.find({
    relations: {
      vehicles: true,
    },
  });
  return users;
};

// Función para obtener un usuario por ID
export const getUserByIdService = async (id: number): Promise<User | null> => {
  const userRepository = AppDataSource.getRepository(User);
  const user = await userRepository.findOneBy({ id });
  return user;
};

// Función para eliminar un usuario
export const deleteUserService = async (id: number): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);
  await userRepository.delete({ id });
};
