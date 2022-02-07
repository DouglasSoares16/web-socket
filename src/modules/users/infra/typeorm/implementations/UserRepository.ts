import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import { IFindByUsersDTO } from "../../../dtos/IFindByUsersDTO";
import { IUserRepository } from "../../../repositories/IUserRepository";
import { User } from "../entities/User";

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findByUsers({ user_one, user_two }: IFindByUsersDTO): Promise<User[]> {
    const one = await this.repository.findOne({
      where: {
        id: user_one,
      }
    });

    const two = await this.repository.findOne({
      where: {
        id: user_two
      }
    });

    return [one, two];
  }

  async findUserBySocket(socket_id: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        socket_id
      }
    });

    return user;
  };

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({
      where: {
        email
      }
    });

    return user;
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const user = this.repository.create(data);

    await this.repository.save(user);

    return user;
  }
}

export { UserRepository };