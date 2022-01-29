import { container } from "tsyringe";
import { io } from "../http";
import { CreateUserUseCase } from "../modules/users/useCases/createUser/CreateUserUseCase";
import { UserRepository } from "../modules/users/infra/typeorm/implementations/UserRepository";

io.on("connect", (socket) => {
  socket.on("start", async (data) => {
    const {
      name,
      email,
      avatar
    } = data;

    const createUserUseCase = container.resolve(CreateUserUseCase);
    const userRepository = new UserRepository();

    await createUserUseCase.execute({
      name,
      email,
      avatar,
      socket_id: socket.id,
    });

    const user = await userRepository.findByEmail(email);

    console.log(user);
  });
});