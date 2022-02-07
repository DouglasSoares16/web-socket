import { getRepository, Repository } from "typeorm";
import { IChatRoomRepository } from "../../../repositories/IChatRoomRepository";
import { ChatRoom } from "../entities/ChatRoom";


class ChatRoomRepository implements IChatRoomRepository {
  private repository: Repository<ChatRoom>;

  constructor() {
    this.repository = getRepository(ChatRoom);
  }

  async findById(room_id: string): Promise<ChatRoom> {
    const room = await this.repository.findOne({
      where: {
        id: room_id
      }
    });

    return room;
  }

  async findByUsers(users_id: string[]): Promise<ChatRoom> {
    const option_1 = [users_id[0], users_id[1]];
    const option_2 = [users_id[1], users_id[0]];

    const room = await this.repository.findOne({
      where: [
        { users_id: option_1 },
        { users_id: option_2 }
      ]
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