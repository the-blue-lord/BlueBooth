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
});