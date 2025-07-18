import { Direction } from "../utils";

export default class Cell {
    constructor(x, y, offset = 0, offset_direction = Direction.Null) {
        this.x = x;
        this.y = y;
        this.off = offset;
        this.off_dir = offset_direction;
    }

    getCanvasX(square_side) {
        let  offset = 0;
        if(Math.abs(this.off_dir) == Direction.Horizontal) offset = this.off * (this.off_dir / Math.abs(this.off_dir));
        return square_side*(this.x + 0.5) + offset;
    }

    getCanvasY(square_side) {
        let offset = 0;
        if(Math.abs(this.off_dir) == Direction.Vertical) offset = this.off * (this.off_dir / Math.abs(this.off_dir));
        return square_side*(this.y + 0.5) + offset;
    }
}