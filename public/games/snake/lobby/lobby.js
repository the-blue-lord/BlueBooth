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
            document.querySelector(":root").style.setProperty("--remove-button-display", "default");
            const btn = document.getElementById("start-lobby");

            btn.onclick = () => socket.emit("start-game-req", room_id);

            btn.disabled = false;
            btn.style.display = "block";
        }

        console.log(data);
        
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
    player_div.classList.add("player-div");
    if(!host) {
        const button_div = document.createElement("button");
        button_div.id = "kick-player";
        button_div.classList.add("remove-button")
        button_div.innerHTML = "X";
        button_div.onclick = () => {
            socket.emit("kick-player", id, room_id);
        }
        player_div.appendChild(button_div);
    }
    return player_div;
}

function repairPlayerData(data_recovery) {
    console.log(data_recovery);
    const server_list = new Map(data_recovery.players.map(obj => [obj.id, obj]));
    const client_list = new Map(
        Array.from(
            document.getElementById("player-list").querySelectorAll(".player-div")
        ).map(div => [div.id, div])
    );

    console.log(server_list, client_list);

    for(const [id, div] of client_list) if(!server_list.has(id)) div.remove();
    for(const [id, data] of server_list) {
        if(client_list.has(id)) continue;
        const player_div = getPlayerDiv(data.id, data.name);
        player_list.appendChild(player_div);
    }
}

socket.on("new-user", (username, id, data_recovery) => {
    const player_div = getPlayerDiv(id, username);
    player_list.appendChild(player_div);
    repairPlayerData(data_recovery);
});

socket.on("user-left", (id, data_recovery) => {
    const player_div = document.getElementById(id);
    player_div.remove();
    repairPlayerData(data_recovery);
});

socket.on("kicked", () => {
    window.location.href="/games/snake";
});