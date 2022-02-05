import { inject, injectable } from "tsyringe";
import { Message } from "../infra/typeorm/entities/Message";
import { IMessageRepository } from "../repositories/IMessageRepository";

@injectable()
class FindMessagesByChatRoomUseCase {
  constructor(
    @inject("MessageRepository")
    private messageRepository: IMessageRepository
  ) {}

  async execute(room_id: string): Promise<Message[]> {
    const messages = await this.messageRepository.findMessagesByRoom(room_id);

    return messages;
  }
}

export { FindMessagesByChatRoomUseCase };