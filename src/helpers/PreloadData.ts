import { AppDataSource, UserModel, VehicleModel } from "../config/data-source";

const preloadUsers = [
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

const vehicles = [
  {
    brand: "Toyota",
    color: "red",
    model: "Corolla",
    year: 2020,
    userId: 1,
  },
  {
    brand: "Toyota",
    color: "red",
    model: "Corolla",
    year: 2021,
    userId: 2,
  },
  {
    brand: "Toyota",
    color: "red",
    model: "Corolla",
    year: 2022,
    userId: 3,
  },
  {
    brand: "Toyota",
    color: "red",
    model: "Corolla",
    year: 2023,
    userId: 4,
  },
  {
    brand: "Toyota",
    color: "red",
    model: "Corolla",
    year: 2024,
    userId: 5,
  },
  {
    brand: "Toyota",
    color: "red",
    model: "Corolla",
    year: 2025,
    userId: 6,
  },
  {
    brand: "Toyota",
    color: "yellow",
    model: "Corolla",
    year: 2021,
    userId: 7,
  },
];

const preloadVehicles = vehicles;

export const preloadUserData = async () => {
  await AppDataSource.manager.transaction(
    async (transactionalEntityManager) => {
      const users = await UserModel.find();
      if (users.length)
        return console.log(
          "no se hizo la precarga de datos porque ya hay datos"
        );

      for await (const user of preloadUsers) {
        const newUser = await UserModel.create(user);
        await transactionalEntityManager.save(newUser);
      }

      console.log("Precarga de datos realizada con exito");
    }
  );
};

export const preloadVehicleData = async () => {
  try {
    AppDataSource.manager.transaction(async (transactionalEntityManager) => {
      for await (const vehicle of preloadVehicles) {
        const newVehicle = await VehicleModel.create(vehicle);
        transactionalEntityManager.save(newVehicle);
        const user = await UserModel.findOneBy({ id: vehicle.userId });

        if (user) {
          newVehicle.user = user;
          transactionalEntityManager.save(newVehicle);
        } else {
          throw Error("Usuario inexistente");
        }
      }
      console.log("Precarga de dato de vehiculos realizada con exito");
    });
  } catch (error) {
    console.error(error);
  }
};
