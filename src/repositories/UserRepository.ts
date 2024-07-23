import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

const UserRepository = AppDataSource.getRepository(User).extend({
  async findById(id: number) {
    const user = this.findOneBy({ id });

    return user;
  },
});

export default UserRepository;
