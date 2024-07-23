import { AppDataSource } from "../config/data-source";
import VehicleRepository from "../repositories/VehicleRepository";
import UserRepository from "../repositories/UserRepository";
import { DeepPartial } from "typeorm";
import { Vehicle } from "../entities/Vehicle";
import { User } from "../entities/User";

const preloadUsers: DeepPartial<User>[] = [
  {
    name: "Maria Vega",
    email: "maria@gmail.com",
    age: 32,
    active: true,
  },
  { name: "Juan Perez", email: "juan@gmail.com", age: 32, active: true },
  {
    name: "Pedro Rodriguez",
    email: "pedro@gmail.com",
    age: 32,
    active: true,
  },
  {
    name: "Luisa Lopez",
    email: "luisa@gmail.com",
    age: 32,
    active: true,
  },
  {
    name: "Luisa Lopez",
    email: "luisa@gmail.com",
    age: 32,
    active: true,
  },
  {
    name: "Luisa Lopez",
    email: "luisa@gmail.com",
    age: 32,
    active: true,
  },
  {
    name: "Luisa Lopez",
    email: "luisa@gmail.com",
    age: 32,
    active: true,
  },
];

const vehicles: DeepPartial<Vehicle>[] = [
  {
    brand: "Toyota",
    color: "red",
    model: "Corolla",
    year: 2020,
    user: { id: 2 }, // Asegúrate de que userId sea un objeto de tipo User
  },
  {
    brand: "Toyota",
    color: "red",
    model: "Corolla",
    year: 2021,
    user: { id: 2 },
  },
  {
    brand: "Toyota",
    color: "red",
    model: "Corolla",
    year: 2022,
    user: { id: 2 },
  },
  {
    brand: "Toyota",
    color: "red",
    model: "Corolla",
    year: 2023,
    user: { id: 4 },
  },
  {
    brand: "Toyota",
    color: "red",
    model: "Corolla",
    year: 2024,
    user: { id: 5 },
  },
  {
    brand: "Toyota",
    color: "red",
    model: "Corolla",
    year: 2025,
    user: { id: 6 },
  },
  {
    brand: "Toyota",
    color: "yellow",
    model: "Corolla",
    year: 2021,
    user: { id: 7 },
  },
];

export const preloadUserData = async () => {
  await AppDataSource.manager.transaction(
    async (transactionalEntityManager) => {
      const users = await UserRepository.find();
      if (users.length)
        return console.log(
          "No se hizo la precarga de datos porque ya hay datos"
        );

      for await (const user of preloadUsers) {
        const newUser = UserRepository.create(user as DeepPartial<User>);
        await transactionalEntityManager.save(newUser);
      }

      console.log("Precarga de datos realizada con éxito");
    }
  );
};

export const preloadVehicleData = async () => {
  try {
    await AppDataSource.manager.transaction(
      async (transactionalEntityManager) => {
        for await (const vehicle of vehicles) {
          const newVehicle = VehicleRepository.create(
            vehicle as DeepPartial<Vehicle>
          );
          await transactionalEntityManager.save(newVehicle);

          const user = await UserRepository.findOneBy({ id: vehicle.user?.id });

          if (user) {
            newVehicle.user = user;
            await transactionalEntityManager.save(newVehicle);
          } else {
            throw Error("Usuario inexistente");
          }
        }
        console.log("Precarga de datos de vehículos realizada con éxito");
      }
    );
  } catch (error) {
    console.error(error);
  }
};
