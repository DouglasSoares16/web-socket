import { inject, injectable } from "tsyringe";
import { ChatRoom } from "../infra/typeorm/entities/ChatRoom";
import { IChatRoomRepository } from "../repositories/IChatRoomRepository";

@injectable()
class GetChatRoomByUsersUseCase {
  constructor(
    @inject("ChatRoomRepository")
    private chatRoomRepository: IChatRoomRepository
  ) {}

  async execute(users_id: string[]): Promise<ChatRoom> {
    const room = await this.chatRoomRepository.findByUsers(users_id);

    return room;
  }
}

export { GetChatRoomByUsersUseCase };