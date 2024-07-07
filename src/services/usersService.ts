import { UserModel } from "../config/data-source";
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
  },
];

let id: number = 1;

export const createUserService = async (userData: UserDto) => {
  const user = await UserModel.create(userData);
  const result = await UserModel.save(user);
  return user;
};

export const getUsersService = async (): Promise<User[]> => {
  const users = await UserModel.find({
    relations: {
      vehicles: true,
    },
  });
  return users;
};

export const getUserByIdService = async (id: number): Promise<User | null> => {
  const user = await UserModel.findOneBy({
    id,
  });
  return user;
};

export const deleteUserService = async (id: number): Promise<void> => {
  users = users.filter((user) => {
    return user.id !== id;
  });
};
