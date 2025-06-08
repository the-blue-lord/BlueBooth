class Snake {
    constructor(board) {
        this.isAlive = true;
        this.ms = 700;

        this.board = board;
        this.length = 3;

        this.head = this.board.cells[2][0];
        this.direction = Direction.Right;

        this.body = [this.board.cells[0][0], this.board.cells[1][0]];

        window.addEventListener("keydown", (event) => {
            if(event.key == "ArrowUp") this.direction = Direction.Up;
            else if(event.key == "ArrowDown") this.direction = Direction.Down;
            else if(event.key == "ArrowLeft") this.direction = Direction.Left;
            else if(event.key == "ArrowRight") this.direction = Direction.Right;
            else if(event.code == "Space") this.ms = 300;
        });

        window.addEventListener("keyup", (event) => {
            if(event.code == "Space") this.ms = 700;
        });

        window.addEventListener("keypress", (event) => {
            if(event.key.toUpperCase() == "P") this.isAlive = false;
        });
    }

    checkIfAlive() {

    }

    colourSnake() {
        this.head.element.classList.add("snake-head");
        for(const cell of this.body) {
            cell.element.classList.add("snake-body");
        }

        return this;
    }

    moveSnake() {
        var x = this.head.x;
        var y = this.head.y;

        if(this.direction == Direction.Up) y -= 1;
        else if(this.direction == Direction.Down) y += 1;
        else if(this.direction == Direction.Left) x -= 1;
        else if(this.direction == Direction.Right) x += 1;

        while(x < 0) x += this.board.width;
        while(y < 0) y += this.board.height;

        x %= this.board.width;
        y %= this.board.height;

        this.head.element.classList.remove("snake-head");
        this.head.element.classList.add("snake-body");
        this.body.push(this.head);
        this.head = this.board.cells[x][y];
        
        this.body[0].element.classList.remove("snake-body");
        this.body.shift();
    }
}