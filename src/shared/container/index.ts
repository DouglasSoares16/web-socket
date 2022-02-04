import { container } from "tsyringe";
import { ChatRoomRepository } from "../../modules/chat/infra/typeorm/implementations/ChatRoomRepository";
import { MessageRepository } from "../../modules/chat/infra/typeorm/implementations/MessageRepository";
import { IChatRoomRepository } from "../../modules/chat/repositories/IChatRoomRepository";
import { IMessageRepository } from "../../modules/chat/repositories/IMessageRepository";
import { UserRepository } from "../../modules/users/infra/typeorm/implementations/UserRepository";
import { IUserRepository } from "../../modules/users/repositories/IUserRepository";

container.registerSingleton<IUserRepository>(
  "UserRepository",
  UserRepository
);

container.registerSingleton<IChatRoomRepository>(
  "ChatRoomRepository",
  ChatRoomRepository
);

container.registerSingleton<IMessageRepository>(
  "MessageRepository",
  MessageRepository
);