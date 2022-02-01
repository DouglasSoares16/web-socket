import { getRepository, Repository } from "typeorm";
import { IChatRoomRepository } from "../../../repositories/IChatRoomRepository";
import { ChatRoom } from "../entities/ChatRoom";


class ChatRoomRepository implements IChatRoomRepository {
  private repository: Repository<ChatRoom>;

  constructor() {
    this.repository = getRepository(ChatRoom);
  }

  async create(users_id: string[]): Promise<ChatRoom> {
    const room = this.repository.create({ users_id });

    await this.repository.save(room);

    return room;
  }
}

export { ChatRoomRepository };