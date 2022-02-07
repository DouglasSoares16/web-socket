import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("chat_room")
class ChatRoom {
  @PrimaryColumn()
  readonly id: string;

  @Column("uuid", { array: true })
  users_id: string[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { ChatRoom };