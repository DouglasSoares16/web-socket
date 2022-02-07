import { inject, injectable } from "tsyringe";
import { User } from "../../users/infra/typeorm/entities/User";
import { IUserRepository } from "../../users/repositories/IUserRepository";
import { IChatRoomRepository } from "../repositories/IChatRoomRepository";

@injectable()
class GetChatRoomByIdUseCase {
  constructor(
    @inject("ChatRoomRepository")
    private chatRoomRepository: IChatRoomRepository,

    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(room_id: string): Promise<{
    id: string;
    users_id: string[];
    users: User[];
  }> {
    const room = await this.chatRoomRepository.findById(room_id);

    const users = await this.userRepository.findByUsers({
      user_one: room.users_id[0],
      user_two: room.users_id[1],
    });

    return { ...room, users };
  }
}

export { GetChatRoomByIdUseCase }