import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

const server = createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Socket: ", socket.id);
});

export { server, io };