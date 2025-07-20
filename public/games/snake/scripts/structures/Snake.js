import Cell from "./Cell";

import { Direction } from "../utils";

export default class Snake {
    constructor(length = 3, direction = Direction.Right) {
        this.speed = 2;
        this.head = new Cell(5, 6, direction);
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
};