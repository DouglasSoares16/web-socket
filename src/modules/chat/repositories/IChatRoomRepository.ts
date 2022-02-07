import { ChatRoom } from "../infra/typeorm/entities/ChatRoom";

interface IChatRoomRepository {
  create(users_id: string[]): Promise<ChatRoom>;
  findByUsers(users_id: string[]): Promise<ChatRoom>;
  findById(room_id: string): Promise<ChatRoom>;
}

export { IChatRoomRepository };