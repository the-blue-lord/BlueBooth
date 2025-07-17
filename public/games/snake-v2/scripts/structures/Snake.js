import Cell from "./Cell";

export default class Snake {
    constructor() {
        this.head = new Cell(5, 3);
        this.body = [];
    }
};