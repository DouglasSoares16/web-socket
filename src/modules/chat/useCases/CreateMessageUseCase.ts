import { inject, injectable } from "tsyringe";
import { ICreateMessageDTO } from "../dtos/ICreateMessageDTO";
import { Message } from "../infra/typeorm/entities/Message";
import { IMessageRepository } from "../repositories/IMessageRepository";

@injectable()
class CreateMessageUseCase {
  constructor(
    @inject("MessageRepository")
    private messageRepository: IMessageRepository
  ) {}
  
  async execute({ to, text, room_id }: ICreateMessageDTO): Promise<Message> {
    const message = await this.messageRepository.create({ to, text, room_id });

    return message;
  }
}

export { CreateMessageUseCase };