import { getRepository, Repository } from "typeorm";
import { ICreateMessageDTO } from "../../../dtos/ICreateMessageDTO";
import { IMessageRepository } from "../../../repositories/IMessageRepository";
import { Message } from "../entities/Message";

class MessageRepository implements IMessageRepository {
  private repository: Repository<Message>;

  constructor() {
    this.repository = getRepository(Message);
  }

  async create(data: ICreateMessageDTO): Promise<Message> {
    const message = this.repository.create(data);

    await this.repository.save(message);

    return message;
  }
}

export { MessageRepository };