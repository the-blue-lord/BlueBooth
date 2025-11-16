import io from "socket.io-client";

const params = new URLSearchParams(window.location.search);

const canvas = document.getElementById("board");
canvas.height = canvas.clientHeight;
canvas.width = canvas.clientHeight;

let game_data;

const socket = io("http://localhost:6431/snake");
socket.on("connect", () => {
    startGame();
});

function startGame() {
    socket.emit("join", params.get("lobby"), updateGame);
}

function updateGame(new_data) {
    game_data = new_data;
    requestAnimationFrame(animate);
}

function animate() {
    drawGui(game_data, socket.id);
    socket.emit("update", user_inputs, updateGame);
}