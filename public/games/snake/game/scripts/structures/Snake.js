import Cell from "./Cell";

import { Direction } from "../utils";

export default class Snake {
    constructor(length = 3, direction = Direction.Right) {
        this.speed = 2;
        this.head = new Cell(8, 5, direction);
        let delta_x = 0;
        let delta_y = 0;
        switch (direction) {
            case Direction.Up:
                delta_y = 1;
                break;
            case Direction.Down:
                delta_y = -1;
                break;
            case Direction.Left:
                delta_x = 1;
                break;
            case Direction.Right:
                delta_x = -1;
                break;
        }
        this.body = [];

        this.isAlive = true;

        for(let i = 1; i < length+1; i++) this.body.push(new Cell(this.head.x + delta_x * i, this.head.y + delta_y * i, direction));
    }

    getVertices(){
        const vertices = [this.head];

        let last_cell = this.head;

        this.body.forEach(cell => {
            const last_vertex = vertices[vertices.length - 1];
            if((last_vertex.x-last_cell.x)*(last_cell.y-cell.y) != (last_vertex.y-last_cell.y)*(last_cell.x-cell.x)) vertices.push(last_cell);
            last_cell = cell;
        });

        return vertices;
    }

    drawSnakeHead(context, snake_head, square_side, snake_head_color = "red") {
        const head_x = snake_head.getCanvasX(square_side);
        const head_y = snake_head.getCanvasY(square_side);

        context.fillStyle = snake_head_color;
        context.beginPath();
        context.arc(head_x, head_y, 3*square_side/8, 0, Math.PI * 2);
        context.fill();
    }

    drawSnakeBody(context, snake_head, snake_vertices, snake_tail, square_side, snake_body_color = "red") {
        const thickness = this.getSnakeThikness(square_side);

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

    getSnakeThikness(square_side) {
        return 3*square_side/4;
    }
};