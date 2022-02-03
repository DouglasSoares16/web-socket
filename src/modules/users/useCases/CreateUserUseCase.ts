import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../infra/typeorm/entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ name, email, avatar, socket_id }: ICreateUserDTO): Promise<User> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      // update user
      const userUpdated = await this.userRepository.create({ 
        id: userExists.id, 
        name, 
        email, 
        avatar, 
        socket_id,
        created_at: userExists.created_at
       });

       return userUpdated;
    }

    const user = await this.userRepository.create({ 
      name, 
      email, 
      avatar, 
      socket_id 
    });

    return user;
  }
}

export { CreateUserUseCase };