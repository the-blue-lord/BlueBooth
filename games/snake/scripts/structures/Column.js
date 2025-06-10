class Column {
    constructor(x, height) {
        this.x = x;
        this.height = height;

        this.element = document.createElement("div");
        this.element.classList.add("column");

        this.cells = [];

        for(let i = 0; i < this.height; i++) {
            const cell = new Cell(x, i, x+i);
            this.element.appendChild(cell.element);
            this.cells.push(cell);
        }
    }
}