import { initBoard } from "./utilis";
import Snake from "./structures/Snake";
import Apple from "./structures/Apple";
import io from "socket.io-client";

const params = new URLSearchParams(window.location.search);

document.addEventListener("DOMContentLoaded", async () => {
    const socket = io("http://localhost:6445/games/snake");
    const lobby = params.get("id");
    socket.emit("join-lobby", lobby);
    socket.on("player-lost", id => alert((id || "someone") + "lost"));

    const board = initBoard(20);
    const apple_generator = new Apple(board);
    const snake = new Snake(board, apple_generator, 4);

    apple_generator.create();

    const scoreElement = document.getElementById("score");

    while(snake.isAlive) {
        snake.colourSnake();
        scoreElement.innerHTML = snake.score;
        await new Promise(resolve => setTimeout(resolve, snake.ms*snake.ms_mult));
        snake.moveSnake();
        snake.checkState();
    }
    socket.emit("game-lost", lobby);

    const audio_lost = new Audio("audios/snake-lost.mp3");
    const root_style = document.documentElement.style;

    audio_lost.play();
    root_style.setProperty("--color-one", "grey");
    root_style.setProperty("--color-two", "lightgrey");

    const loose_div = document.createElement("div");
        loose_div.classList.add("loose-div");

    const button_div = document.createElement("div");
        button_div.classList.add("loose-button-div");

    const replay_button = document.createElement("loose-button");
        replay_button.innerHTML = "Play Again";
        replay_button.onclick = () => window.location.reload();
        replay_button.classList.add("loose-button");

    const home_button = document.createElement("loose-button");
        home_button.innerHTML = "Home";
        home_button.onclick = () => window.location.href = "../../homepagetest/homepage.html";
        home_button.classList.add("loose-button");

    loose_div.appendChild(replay_button);
    loose_div.appendChild(home_button);


    console.log("Game Over! Your score was: " + snake.score);
    document.body.appendChild(loose_div);
});