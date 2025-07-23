import Snake from "./Snake"
import Cell from "./Cell";
import { Direction, boundInRange } from "../utils";

export default class Game {
    constructor(canvas, squares_per_side, squares_per_viewport) {
        this.ctx = canvas.getContext("2d");

        this.viewport_side = canvas.height;
        this.square_side = this.viewport_side / squares_per_viewport;
        this.board_side = this.square_side * squares_per_side;

        this.data = {};
        this.inputs = [];
        this.snake = new Snake(7);

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
            const snake_head = this.snake.head;
            const snake_vertices = this.snake.getVertices();
            const snake_tail = this.snake.body[this.snake.body.length-1];

            this.drawSnakeBody(this.ctx, snake_head, snake_vertices, snake_tail, this.square_side, "red");
            this.drawSnakeHead(this.ctx, snake_head, this.square_side, "black");
        });
    }

    updateGame() {
        const snake = this.snake;

        if(!snake.isAlive) return;

        snake.head.off += this.snake.speed;
        snake.body.forEach(cell => cell.off += this.snake.speed);

        if(snake.head.off >= this.square_side) {
            snake.head.off = 0;
            snake.body.forEach(cell => cell.off = 0);
            snake.body.unshift(new Cell(snake.head.x, snake.head.y, snake.head.off_dir));
            snake.body.pop();

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

        const body_segments = []

        body_segments.push(...[...this.snake.getVertices(), snake.body[snake.body.length - 1]].map((v, i, a) => [
            {
                x: v.getCanvasX(this.square_side, i == 0),
                y: v.getCanvasY(this.square_side, i == 0)
            },
            {
                x: a[i+1]?.getCanvasX(this.square_side, i == a.length - 2),
                y: a[i+1]?.getCanvasY(this.square_side, i == a.length - 2)
            }
        ]).slice(0, -1));

        body_segments.forEach(segment => {
            const head_x = snake.head.getCanvasX(this.square_side);
            const head_y = snake.head.getCanvasY(this.square_side);

            const segment_x =  boundInRange(head_x, segment[0].x, segment[1].x);
            const segment_y =  boundInRange(head_y, segment[0].y, segment[1].y);

            if(Math.round(head_x) == Math.round(segment_x) && Math.round(head_y) == Math.round(segment_y)) return;

            if((head_x-segment_x)**2 + (head_y-segment_y)**2 < this.getSnakeThikness()**2) snake.isAlive = false;
        });
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

    drawSnakeHead(context, snake_head, square_side, snake_head_color = "red") {
        const head_x = snake_head.getCanvasX(square_side);
        const head_y = snake_head.getCanvasY(square_side);

        context.fillStyle = snake_head_color;
        context.beginPath();
        context.arc(head_x, head_y, 3*this.square_side/8, 0, Math.PI * 2);
        context.fill();
    }

    drawSnakeBody(context, snake_head, snake_vertices, snake_tail, square_side, snake_body_color = "red") {
        const thickness = this.getSnakeThikness();

        context.strokeStyle = snake_body_color;
        context.fillStyle = snake_body_color;
        context.lineWidth = thickness;

        const head_x = snake_head.getCanvasX(square_side);
        const head_y = snake_head.getCanvasY(square_side);

        context.beginPath();
        context.moveTo(head_x, head_y);

        snake_vertices.forEach((vertex) => {
            const vertex_x = vertex.getCanvasX(square_side, false);
            const vertex_y = vertex.getCanvasY(square_side, false);

            context.lineTo(vertex_x, vertex_y);
            context.stroke();

            context.beginPath();
            context.arc(vertex_x, vertex_y, thickness/2, 0, Math.PI * 2);
            context.fill();

            context.beginPath();
            context.moveTo(vertex_x, vertex_y);
        });

        const tail_x = snake_tail.getCanvasX(square_side);
        const tail_y = snake_tail.getCanvasY(square_side);

        context.lineTo(tail_x, tail_y);
        context.stroke();

        context.beginPath();
        context.arc(tail_x, tail_y, thickness/2, 0, Math.PI * 2);
        context.fill();
    }

    getSnakeThikness() {
        return 3*this.square_side/4;
    }
}