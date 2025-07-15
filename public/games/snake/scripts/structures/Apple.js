export default class Apple {
    constructor(board) {
        this.board = board;

        window.addEventListener("keypress", (event) => {
            if(event.code == "KeyM") this.create();
        });
    }

    create() {
        let apple_cell;

        do {
            let x_pos = Math.floor(Math.random()*this.board.width);
            let y_pos = Math.floor(Math.random()*this.board.height);

            if(x_pos >= this.board.width) x_pos = this.board.width - 1;
            if(y_pos >= this.board.height) y_pos = this.board.height - 1;

            apple_cell = this.board.cells[x_pos][y_pos].element;
        } while (apple_cell.classList.contains("snake-body") || apple_cell.classList.contains("snake-head"))

        apple_cell.classList.add("apple");
    }
}