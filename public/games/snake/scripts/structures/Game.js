import Snake from "./Snake"
import Cell from "./Cell";
import { Direction } from "../utils";

export default class Game {
    constructor(canvas, squares_per_side, squares_per_viewport) {
        this.ctx = canvas.getContext("2d");

        this.viewport_side = canvas.height;
        this.square_side = this.viewport_side / squares_per_viewport;
        this.board_side = this.square_side * squares_per_side;

        this.data = {};
        this.inputs = [];
        this.snake = new Snake(3);

        console.log(this);
    }

    initListeners(document) {
        document.addEventListener("keydown", (event) => {
            switch(event.key) {
                case "ArrowUp":
                    this.addMovementAction(Direction.Up);
                    break;
                case "ArrowDown":
                    this.addMovementAction(Direction.Down);
                    break;
                case "ArrowLeft":
                    this.addMovementAction(Direction.Left);
                    break;
                case "ArrowRight":
                    this.addMovementAction(Direction.Right);
                    break;
            }
        });
    }

    drawBoard() {
        this.ctx.fillStyle = "darkred";
        this.ctx.fillRect(0, 0, this.viewport_side, this.viewport_side);
    
        this.translatedCanvas( () => {
            this.ctx.fillStyle = this.getBoardPattern();
            this.ctx.fillRect(0, 0, this.board_side, this.board_side);
        });
            
    }

    drawSnakes() {
        this.translatedCanvas( () => {
            this.ctx.fillStyle = "black";
            this.ctx.beginPath();
            this.ctx.arc(this.snake.head.getCanvasX(this.square_side), this.snake.head.getCanvasY(this.square_side), 3*this.square_side/8, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.fillStyle = "white";
            this.snake.body.forEach(cell => {
                this.ctx.beginPath();
                this.ctx.arc(cell.getCanvasX(this.square_side), cell.getCanvasY(this.square_side), 3*this.square_side/8, 0, Math.PI * 2);
                this.ctx.fill();
            });
        });
    }

    updateState() {
        const snake = this.snake;

        snake.head.off += this.snake.speed;
        snake.body.forEach(cell => cell.off += this.snake.speed);

        if(snake.head.off >= this.square_side) {
            snake.head.off = 0;
            snake.body.forEach(cell => cell.off = 0);
            snake.body.push(new Cell(snake.head.x, snake.head.y, snake.head.off_dir));
            snake.body.shift();

            switch(snake.head.off_dir) {
                case Direction.Up:
                    snake.head.y--;
                    break;
                case Direction.Down:
                    snake.head.y++;
                    break;
                case Direction.Left:
                    snake.head.x--;
                    break;
                case Direction.Right:
                    snake.head.x++;
                    break;
            }

            snake.head.off_dir = this.inputs.shift() || snake.head.off_dir;
        }
    }

    getBoardPattern() {
        const pattern_canvas = document.createElement("canvas");

        pattern_canvas.width = 2*this.square_side;
        pattern_canvas.height = 2*this.square_side;
        const pattern_ctx = pattern_canvas.getContext("2d");

        pattern_ctx.fillStyle = "green";
        pattern_ctx.fillRect(0, 0, this.square_side, this.square_side);
        pattern_ctx.fillRect(this.square_side, this.square_side, this.square_side, this.square_side);

        pattern_ctx.fillStyle = "yellowgreen";
        pattern_ctx.fillRect(this.square_side, 0, this.square_side, this.square_side);
        pattern_ctx.fillRect(0, this.square_side, this.square_side, this.square_side);

        const pattern = this.ctx.createPattern(pattern_canvas, "repeat");

        return pattern;
    }

    translatedCanvas(function_to_run) {
        this.ctx.save();

        this.ctx.translate((this.viewport_side/2)-this.snake.head.getCanvasX(this.square_side), (this.viewport_side/2)-this.snake.head.getCanvasY(this.square_side));

        function_to_run();

        this.ctx.restore();
    }

    addMovementAction(direction) {
        const input_length = this.inputs.length;
        const last_input = this.inputs[input_length-1];
        const snake_direction = this.snake.head.off_dir;
        if((last_input || snake_direction) != direction && (last_input || snake_direction) != -direction) this.inputs.push(direction);
    }
}