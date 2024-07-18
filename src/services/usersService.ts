import { AppDataSource } from "../config/data-source";
import UserRepository from "../repositories/VehicleRepository";
import UserDto from "../dto/UserDto";
import { User } from "../entities/User";
import { Vehicle } from "../entities/Vehicle";

let users: User[] = [
  {
    id: 1,
    name: "",
    email: "",
    age: 33,
    active: true,
    vehicles: [new Vehicle()],
    user: new Vehicle(),
  },
];

let id: number = 1;

export const createUserService = async (userData: UserDto) => {
  const user = await UserRepository.create(userData);
  const result = await UserRepository.save(user);
  return user;
};

export const getUsersService = async (): Promise<User[]> => {
  const users = await UserRepository.find({
    relations: {
      vehicles: true,
    },
  });
  return users;
};

export const getUserByIdService = async (id: number): Promise<User | null> => {
  const user = await UserRepository.findOneBy({
    id,
  });
  return user;
};

export const deleteUserService = async (id: number): Promise<void> => {
  users = users.filter((user) => {
    return user.id !== id;
  });
};
