document.addEventListener("DOMContentLoaded", async () => {
    const board = initBoard(20);
    const apple_generator = new Apple(board);
    const snake = new Snake(board, apple_generator, 4);

    apple_generator.create();

    while(snake.isAlive) {
        snake.colourSnake();
        await new Promise(resolve => setTimeout(resolve, snake.ms*snake.ms_mult));
        snake.moveSnake();
        snake.checkState();
    }

    const audio_lost = new Audio("audios/snake-lost.mp3");
    const root_style = document.documentElement.style;

    audio_lost.play();
    root_style.setProperty("--color-one", "grey");
    root_style.setProperty("--color-two", "lightgrey");
});