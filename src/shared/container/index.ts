import { container } from "tsyringe";
import { ChatRoomRepository } from "../../modules/chat/infra/typeorm/implementations/ChatRoomRepository";
import { IChatRoomRepository } from "../../modules/chat/repositories/IChatRoomRepository";
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