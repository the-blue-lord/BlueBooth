export default class Cell {
    constructor(x, y, parity) {
        this.x = x;
        this.y = y;

        this.element = document.createElement("div");
        this.element.classList.add("cell");
        this.element.id = x+","+y;

        this.parity = parity%2 == 0? "one" : "two";
        this.element.classList.add("cell-"+this.parity);
    }
}