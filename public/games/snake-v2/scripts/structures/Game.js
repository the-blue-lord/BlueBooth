import Snake from "./Snake"
import { Direction } from "../utils";

export default class Game {
    constructor(canvas, squares_per_side, squares_per_viewport) {
        this.ctx = canvas.getContext("2d");

        this.viewport_side = canvas.height;
        this.square_side = this.viewport_side / squares_per_viewport;
        this.board_side = this.square_side * squares_per_side;

        this.data = {};
        this.inputs = [];
        this.snake = new Snake();
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
                case "KeyP":
                    this.addMovementAction(Direction.Null);
                    break;
            }
        });
    }

    drawBoard() {
        this.ctx.fillStyle = "darkred";
        this.ctx.fillRect(0, 0, this.viewport_side, this.viewport_side);
    
        this.trnaslatedCanvas( () => {
            this.ctx.fillStyle = this.getBoardPattern();
            this.ctx.fillRect(0, 0, 2*this.viewport_side, 2*this.viewport_side);
        });
            
    }

    drawSnakes() {
        this.ctx.fillStyle = "black";

        this.trnaslatedCanvas( () => {
            this.ctx.beginPath();
            this.ctx.arc(this.snake.head.getCanvasX(this.square_side), this.snake.head.getCanvasY(this.square_side), 3*this.square_side/8, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    updateState() {
        const snake_head = this.snake.head;
        let direction = this.inputs.shift() || Direction.Null;

        switch(direction) {
            case Direction.Up:
                snake_head.y--;
                break;
            case Direction.Down:
                snake_head.y++;
                break;
            case Direction.Left:
                snake_head.x--;
                break;
            case Direction.Right:
                snake_head.x++;
                break;
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

    trnaslatedCanvas(function_to_run) {
        this.ctx.save();

        this.ctx.translate((this.viewport_side/2)-this.snake.head.getCanvasX(this.square_side), (this.viewport_side/2)-this.snake.head.getCanvasY(this.square_side));

        function_to_run();

        this.ctx.restore();
    }

    addMovementAction(direction) {
        const input_length = this.inputs.length;
        const last_input = this.inputs[input_length-1];
        if(!input_length || (last_input != direction && last_input != -direction)) this.inputs.push(direction);
    }
}