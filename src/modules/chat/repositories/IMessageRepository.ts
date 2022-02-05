import { ICreateMessageDTO } from "../dtos/ICreateMessageDTO";
import { Message } from "../infra/typeorm/entities/Message";

interface IMessageRepository {
  create(data: ICreateMessageDTO): Promise<Message>;
  findMessagesByRoom(room_id: string): Promise<Message[]>;
}

export { IMessageRepository };