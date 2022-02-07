import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IFindByUsersDTO } from "../dtos/IFindByUsersDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(): Promise<User[]>;
  findUserBySocket(socket_id: string): Promise<User>;
  findByUsers(data: IFindByUsersDTO): Promise<User[]>;
}

export { IUserRepository };