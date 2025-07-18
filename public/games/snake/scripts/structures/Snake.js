import Cell from "./Cell";

export default class Snake {
    constructor() {
        this.speed = 2;
        this.head = new Cell(5, 6, 0, 1);
        this.body = [new Cell(19, 20), new Cell(18, 20), new Cell(17, 20)];
    }
};