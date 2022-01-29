const socket = io("http://localhost:5500");

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
    console.log("get users:  ", users);

    users.map((user) => {
      if (user.email !== email) {
        addUsers(user);
      }
    });
  });
}

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

onLoad();
