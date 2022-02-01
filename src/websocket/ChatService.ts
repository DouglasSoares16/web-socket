import { container } from "tsyringe";
import { io } from "../http";
import { CreateChatRoomUseCase } from "../modules/chat/useCases/createChatRoom/CreateChatRoomUseCase";
import { CreateUserUseCase } from "../modules/users/useCases/createUser/CreateUserUseCase";
import { FindUserBySocketIdUseCase } from "../modules/users/useCases/findUserBySocketId/FindUserBySocketIdUseCase";
import { ListAllUserUseCase } from "../modules/users/useCases/listAllUser/ListAllUserUseCase";

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

    const userLogged = await findUserBySocketIdUseCase.execute(socket.id);

    const room = await createChatRoomUseCase.execute([
      userLogged.id, 
      data.idUser
    ]);

    console.log(room);

    callback(room);
  });
});