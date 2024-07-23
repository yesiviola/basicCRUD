import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

const UserRepository = AppDataSource.getRepository(User).extend({
  findById: async function (id: number): Promise<User | null> {
    const user = this.findOneBy({ id });
    return user;
  },
  checkById: async function (id: number): Promise<boolean> {
    const user = await this.findById(id);
    return user !== null;
  },
});

export default UserRepository;
