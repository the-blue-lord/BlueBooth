import Column from "./Column";

export default class Board {
    constructor(board, width, height) {
        this.element = board;
        this.width = width;
        this.height = height;
        this.cells = [];

        for(let i = 0; i < width; i++) {
            const column = new Column(i, height);
            this.element.appendChild(column.element);
            this.cells.push(column.cells);
        }
    }
}