import { inject, injectable } from "tsyringe";
import { User } from "../../infra/typeorm/entities/User";
import { IUserRepository } from "../../repositories/IUserRepository";

@injectable()
class FindUserBySocketIdUseCase {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(socket_id: string): Promise<User> {
    const user = await this.userRepository.findUserBySocket(socket_id);

    return user;
  }
}

export { FindUserBySocketIdUseCase };