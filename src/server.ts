import { server } from "./http";
import "./websocket/ChatService";

server.listen(5500, () => console.log("rodando"));