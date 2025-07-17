import { Direction } from "../utils";

export default class Cell {
    constructor(x, y, offset = 0, offset_direction = Direction.Null) {
        this.x = x;
        this.y = y;
        this.off = offset;
        this.off_dir = offset_direction;
    }

    getCanvasX(square_side) {
        return square_side*(this.x + 0.5);
    }

    getCanvasY(square_side) {
        return square_side*(this.y + 0.5);
    }
}