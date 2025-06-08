document.addEventListener("DOMContentLoaded", async () => {
    const board = initBoard();
    const snake = new Snake(board);

    snake.colourSnake();

    while(snake.isAlive) {
        await new Promise(resolve => setTimeout(resolve, snake.ms));
        snake.moveSnake();
        snake.colourSnake();
        snake.checkIfAlive();
    }
});