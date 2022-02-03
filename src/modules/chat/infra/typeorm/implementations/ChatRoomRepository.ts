import { getRepository, Repository, In } from "typeorm";
import { IChatRoomRepository } from "../../../repositories/IChatRoomRepository";
import { ChatRoom } from "../entities/ChatRoom";


class ChatRoomRepository implements IChatRoomRepository {
  private repository: Repository<ChatRoom>;

  constructor() {
    this.repository = getRepository(ChatRoom);
  }

  async findOne(users_id: string[]): Promise<ChatRoom> {
    const room = await this.repository.findOne({
      where: {
        users_id
      }
    });

    return room;
  }

  async create(users_id: string[]): Promise<ChatRoom> {
    const room = this.repository.create({ users_id });

    await this.repository.save(room);

    return room;
  }
}

export { ChatRoomRepository };