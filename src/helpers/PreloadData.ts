import { AppDataSource, UserModel } from "../config/data-source";
import IUser from "../interfaces/IUser";

const user1: IUser = {
  name: "Maria Vega",
  email: "maria@gmail.com",
  age: 32,
  active: true,
};

const user2: IUser = {
  name: "Juan Perez",
  email: "juan@gmail.com",
  age: 32,
  active: true,
};

const user3: IUser = {
  name: "Pedro Rodriguez",
  email: "pedro@gmail.com",
  age: 32,
  active: true,
};

const user4: IUser = {
  name: "Luisa Lopez",
  email: "luisa@gmail.com",
  age: 32,
  active: true,
};

const user5: IUser = {
  name: "Luisa Lopez",
  email: "luisa@gmail.com",
  age: 32,
  active: true,
};

const user6: IUser = {
  name: "Luisa Lopez",
  email: "luisa@gmail.com",
  age: 32,
  active: true,
};

const user7: IUser = {
  name: "Luisa Lopez",
  email: "luisa@gmail.com",
  age: 32,
  active: true,
};

export const preloadData = async () => {
  await AppDataSource.manager.transaction(
    async (transactionalEntityManager) => {
      const users = await UserModel.find();
      if (users.length)
        return console.log(
          "no se hizo la precarga de datos porque ya hay datos"
        );

      const newUser1 = await UserModel.create(user1);
      const newUser2 = await UserModel.create(user2);
      const newUser3 = await UserModel.create(user3);
      const newUser4 = await UserModel.create(user4);
      const newUser5 = await UserModel.create(user5);
      const newUser6 = await UserModel.create(user6);
      const newUser7 = await UserModel.create(user7);

      await transactionalEntityManager.save(newUser1);
      await transactionalEntityManager.save(newUser2);
      await transactionalEntityManager.save(newUser3);
      await transactionalEntityManager.save(newUser4);
      await transactionalEntityManager.save(newUser5);
      await transactionalEntityManager.save(newUser6);
      await transactionalEntityManager.save(newUser7);

      console.log("Precarga de datos realizada con exito");
    }
  );
};
