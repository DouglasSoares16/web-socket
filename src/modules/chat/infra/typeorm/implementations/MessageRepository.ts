import { getRepository, Repository } from "typeorm";
import { ICreateMessageDTO } from "../../../dtos/ICreateMessageDTO";
import { IMessageRepository } from "../../../repositories/IMessageRepository";
import { Message } from "../entities/Message";

class MessageRepository implements IMessageRepository {
  private repository: Repository<Message>;

  constructor() {
    this.repository = getRepository(Message);
  }

  async findMessagesByRoom(room_id: string): Promise<Message[]> {
    const messages = await this.repository.find({
      where: {
        room_id,
      },
      relations: ["to_user"]
    });

    return messages;
  }

  async create(data: ICreateMessageDTO): Promise<Message> {
    const message = this.repository.create(data);

    await this.repository.save(message);

    return message;
  }
}

export { MessageRepository };