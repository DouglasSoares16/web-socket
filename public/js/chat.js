const socket = io("http://localhost:5500");

socket.on("chat_init", data =>  {
  console.log(data);
});