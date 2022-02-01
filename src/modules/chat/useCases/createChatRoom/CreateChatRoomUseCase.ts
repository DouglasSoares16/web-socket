import { inject, injectable } from "tsyringe";
import { ChatRoom } from "../../infra/typeorm/entities/ChatRoom";
import { IChatRoomRepository } from "../../repositories/IChatRoomRepository";

@injectable()
class CreateChatRoomUseCase {
  constructor(
    @inject("ChatRoomRepository")
    private chatRoomRepository: IChatRoomRepository
  ) {}

  async execute(users_id: string[]): Promise<ChatRoom> {
    const room = await this.chatRoomRepository.create(users_id);

    return room;
  }
}

export { CreateChatRoomUseCase };