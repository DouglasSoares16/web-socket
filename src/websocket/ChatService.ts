import { container } from "tsyringe";
import { io } from "../http";
import { CreateChatRoomUseCase } from "../modules/chat/useCases/CreateChatRoomUseCase";
import { CreateMessageUseCase } from "../modules/chat/useCases/CreateMessageUseCase";
import { FindMessagesByChatRoomUseCase } from "../modules/chat/useCases/FindMessagesByChatRoomUseCase";
import { GetChatRoomByIdUseCase } from "../modules/chat/useCases/GetChatRoomByIdUseCase";
import { GetChatRoomByUsersUseCase } from "../modules/chat/useCases/GetChatRoomByUsersUseCase";
import { CreateUserUseCase } from "../modules/users/useCases/CreateUserUseCase";
import { FindUserBySocketIdUseCase } from "../modules/users/useCases/FindUserBySocketIdUseCase";
import { ListAllUserUseCase } from "../modules/users/useCases/ListAllUserUseCase";

io.on("connect", (socket) => {
  // Evento do Start
  socket.on("start", async (data) => {
    const {
      name,
      email,
      avatar
    } = data;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    const user = await createUserUseCase.execute({
      name,
      email,
      avatar,
      socket_id: socket.id,
    });

    // Quando queremos enviar uma informação para todos os usuários, menos aquele usuário do 'socket' usamos o (broadcast)
    socket.broadcast.emit("new_users", user);
  });

  socket.on("get_users", async (callback) => {
    const listAllUserUseCase = container.resolve(ListAllUserUseCase);

    const users = await listAllUserUseCase.execute();

    callback(users);
  });

  socket.on("start_chat", async (data, callback) => {
    const createChatRoomUseCase = container.resolve(CreateChatRoomUseCase);
    const findUserBySocketIdUseCase = container.resolve(FindUserBySocketIdUseCase);
    const getChatRoomByUsers = container.resolve(GetChatRoomByUsersUseCase);
    const findMessagesByChatRoomUseCase = container.resolve(FindMessagesByChatRoomUseCase);

    const userLogged = await findUserBySocketIdUseCase.execute(socket.id);

    let room = await getChatRoomByUsers.execute([
      userLogged.id, 
      data.idUser
    ]);

    if (!room) {
      room = await createChatRoomUseCase.execute([
        userLogged.id, 
        data.idUser
      ]);
    }

    socket.join(room.id);

    const messages = await findMessagesByChatRoomUseCase.execute(room.id);

    callback({ room, messages });
  });

  socket.on("message", async (data) => {
    const findUserBySocketIdUseCase =  container.resolve(FindUserBySocketIdUseCase);
    const createMessageUseCase = container.resolve(CreateMessageUseCase);
    const getChatRoomByIdUseCase = container.resolve(GetChatRoomByIdUseCase);

    const user = await findUserBySocketIdUseCase.execute(socket.id);

    const message = await createMessageUseCase.execute({
      to: user.id,
      text: data.message,
      room_id: data.chatRoomId
    });

    io.to(data.chatRoomId).emit("message", { 
      message,
      user
    });

    const room = await getChatRoomByIdUseCase.execute(data.chatRoomId);

    const userFrom = room.users.find((response) => response.id != user.id);

    io.to(userFrom.socket_id).emit("notification", {
      newMessage: true,
      room_id: data.chatRoomId,
      from: user
    })
  });
});