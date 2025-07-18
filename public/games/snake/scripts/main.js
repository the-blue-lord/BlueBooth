import io from "socket.io-client";
import Game from "./structures/Game";

const params = new URLSearchParams(window.location.search);

const canvas = document.getElementById("board");
canvas.height = canvas.clientHeight;
canvas.width = canvas.clientHeight;

const local_game = new Game(canvas, 32, 12);
local_game.initListeners(document);

animate();

function animate() {
    local_game.drawBoard();
    local_game.drawSnakes();
    local_game.updateState();

    requestAnimationFrame(animate);
}