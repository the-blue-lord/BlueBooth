document.addEventListener("DOMContentLoaded", async () => {
    const board = initBoard(20);
    const apple_generator = new Apple(board);
    const snake = new Snake(board, apple_generator, 5);

    snake.colourSnake();
    apple_generator.create();

    while(snake.isAlive) {
        await new Promise(resolve => setTimeout(resolve, snake.ms*snake.ms_mult));
        snake.moveSnake();
        snake.checkState();
        snake.colourSnake();
    }
});