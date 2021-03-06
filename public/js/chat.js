const socket = io("http://localhost:5500");
let chatRoomId = "";

function onLoad() {
  const urlParams = new URLSearchParams(window.location.search);

  const name = urlParams.get("name");
  const avatar = urlParams.get("avatar");
  const email = urlParams.get("email");

  document.querySelector(".user_logged").innerHTML += `
    <img
      class="avatar_user_logged"
      src="${avatar}"
    />
    <strong id="user_logged">${name}</strong>
  `;

  // Evento do Start
  socket.emit("start", {
    email,
    name,
    avatar
  });

  /* Evento que ficará escutando se há novos usuários, e se há novos usuários quero que ele atualize mostrando na tela */
  socket.on("new_users", (data) => {
    const existInDiv = document.getElementById(`user_${data.id}`);

    if (!existInDiv) {
      addUsers(data);
    }
  });

  /* Ao usuário se conectar, listar todos os usuários */
  socket.emit("get_users", (users) => {
    users.map((user) => {
      if (user.email !== email) {
        addUsers(user);
      }
    });
  });

  socket.on("message", (data) => {
    if (data.message.room_id === chatRoomId) {
      addMessage(data);
    }
  });

  socket.on("notification", (data) => {
    if (data.room_id !== chatRoomId) {
      const user = document.getElementById(`user_${data.from.id}`);

      user.insertAdjacentHTML("afterbegin", `
      <div class="notification"></div>
    `);
    }
  });
}

document.getElementById("users_list").addEventListener("click", (event) => {
  const inputMessage = document.getElementById("user_message");

  inputMessage.classList.remove("hidden");

  document.querySelectorAll("li.user_name_list").forEach((item) => item.classList.remove("user_in_focus"));

  document.getElementById("message_user").innerHTML = "";

  if (event.target && event.target.matches("li.user_name_list")) {
    const idUser = event.target.getAttribute("idUser");

    event.target.classList.add("user_in_focus");

    const notification = document.querySelector(`#user_${idUser} .notification`);

    if (notification) {
      notification.remove();
    }

    socket.emit("start_chat", { idUser }, (response) => {
      chatRoomId = response.room.id;

      response.messages.forEach((message) => {
        const data = {
          message,
          user: message.to_user
        };

        addMessage(data);
      });
    });
  }
});

document.getElementById("user_message").addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const message = event.target.value;

    event.target.value = "";

    const data = {
      message,
      chatRoomId
    };

    socket.emit("message", data);
  }
});

function addUsers(user) {
  const userList = document.getElementById("users_list");

  userList.innerHTML += `
    <li
      class="user_name_list"
      id="user_${user.id}"
      idUser="${user.id}"
    >
      <img
        class="nav_avatar"
        src=${user.avatar}
      />
      ${user.name}
    </li>
  `;
}

function addMessage(data) {
  const divMessageUser = document.getElementById("message_user");

  divMessageUser.innerHTML += `
    <span class="user_name user_name_date">
      <img
        class="img_user"
        src=${data.user.avatar}
      />
      <strong>${data.user.name} &nbsp; </strong>
      <span>${dayjs(data.user.created_at).format("DD/MM/YYYY HH:mm")}</span>
    </span>
    <div class="messages">
      <span class="chat_message">${data.message.text}</span>
    </div>`;
}

onLoad();
