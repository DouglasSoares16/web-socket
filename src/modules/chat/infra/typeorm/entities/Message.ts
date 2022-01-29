import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "../../../../users/infra/typeorm/entities/User";
import { ChatRoom } from "./ChatRoom";

@Entity("messages")
class Message {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  to: string;

  @JoinColumn({ name: "to" })
  @ManyToOne(() => User)
  to_user: User;

  @Column()
  text: string;

  @Column()
  room_id: string;

  @JoinColumn({ name: "room_id" })
  @ManyToOne(() => ChatRoom)
  room: ChatRoom;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Message };