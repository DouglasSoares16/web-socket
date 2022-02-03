import { ChatRoom } from "../infra/typeorm/entities/ChatRoom";

interface IChatRoomRepository {
  create(users_id: string[]): Promise<ChatRoom>;
  findOne(users_id: string[]): Promise<ChatRoom>;
}

export { IChatRoomRepository };