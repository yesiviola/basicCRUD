import { UserModel } from "../config/data-source";
import UserDto from "../dto/UserDto";
import { User } from "../entities/User";
import { Vehicle } from "../entities/Vehicle";
import IUser from "../interfaces/IUser";

let users: User[] = [
  {
    id: 1,
    name: "Yesesenia",
    email: "yesenia@.com",
    age: 33,
    active: true,
    vehicle: new Vehicle(),
  },
];

let id: number = 2;

export const createUserService = async (userData: UserDto) => {
  const user = await UserModel.create(userData);
  const result = await UserModel.save(user);
  return user;
};

export const getUsersService = async (): Promise<User[]> => {
  const users = await UserModel.find();
  return users;
};

export const getUserByIdService = async (id: number): Promise<User | null> => {
  const user = await UserModel.findOneBy({
    id,
  });
  return user;
};

export const deleteUserService = async (id: number): Promise<void> => {
  users = users.filter((user: IUser) => {
    return user.id !== id;
  });
};
