import io from "socket.io-client";

const socket = io("http://localhost:6445/games/snake");

socket.on("connect", () => {
    document.getElementById("create-lobby").onclick = () => socket.emit("new", () => redirectToRoom(socket.id.split("").reverse().join("")));
});

function redirectToRoom(room_id) {
    if(!sessionStorage.username) sessionStorage.username = window.prompt("username");
    window.location.href=`/games/snake/lobby?room=${room_id}`;
}