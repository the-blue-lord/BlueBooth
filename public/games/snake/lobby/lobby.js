import io from "socket.io-client";

const socket = io("http://localhost:6445/games/snake");

document.getElementById("start-lobby").style.display = "none";

const room_id = (new URLSearchParams(window.location.search)).get("room");
const usrnm = sessionStorage.getItem("username");

const player_list = document.getElementById("player-list");

socket.on("connect", () => {
    if(room_id && usrnm) socket.emit("join", room_id, usrnm, (data) => {
        if(data.status != "ok") return window.location.replace(`/games/snake/join?room=${room_id}`);
        if(socket.id == data.host) {
            const btn = document.getElementById("start-lobby");

            btn.onclick = () => {
                socket.emit(
                    "start-game-req",
                    room_id,
                    () => window.location.replace(`/games/snake/game?room=${room_id}`)
                );
            }

            btn.disabled = false;
            btn.style.display = "block";
        }
        
        for(const index in data.ids) {
            const player_div = getPlayerDiv(data.ids[index], data.players[index], data.ids[index] == data.host);
            player_list.appendChild(player_div);
        }
    });
    else if(room_id) window.location.replace(`/games/snake/join?room=${room_id}`);
    else window.location.replace(`/games/snake/join`);
});


function getPlayerDiv(id, name, host = false) {
    const player_div = document.createElement("div");
    player_div.innerHTML = `${host ? "HOST " : ""}${name} (${id})`;
    player_div.id = id;
    return player_div;
}

socket.on("new-user", (username, id) => {
    const player_div = getPlayerDiv(id, username);
    player_list.appendChild(player_div);
});

socket.on("user-left", (id) => {
    const player_div = document.getElementById(id);
    player_div.remove();
});