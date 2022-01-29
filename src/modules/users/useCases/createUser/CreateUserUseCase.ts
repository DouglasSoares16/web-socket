import { inject, injectable } from "tsyringe";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({ name, email, avatar, socket_id }: ICreateUserDTO): Promise<void> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) {
      // update user
      await this.userRepository.create({ 
        id: userExists.id, 
        name, 
        email, 
        avatar, 
        socket_id,
        created_at: userExists.created_at
       });
    }

    await this.userRepository.create({ name, email, avatar, socket_id });
  }
}

export { CreateUserUseCase };