import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "../../../../users/infra/typeorm/entities/User";

@Entity("chat_room")
class ChatRoom {
  @PrimaryColumn()
  readonly id: string;

  @Column({ array: true })
  users_id: string;

  @ManyToMany(() => User)
  @JoinTable()
  users: User[];

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { ChatRoom };