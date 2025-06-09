class Snake {
    constructor(board, apples, length) {
        this.isAlive = true;
        this.ms = 700;
        this.ms_mult = 1;
        this.growing = false;

        this.board = board;
        this.apples = apples;
        this.length = 3;

        this.head = this.board.cells[length-1][0];
        this.direction = Direction.Right;
        this.directions = [];

        this.body = Array.from({length: length-1}, (_, i) => this.board.cells[i][0]);

        window.addEventListener("keydown", (event) => {
            if(event.code == "ArrowUp") this.directions.push(Direction.Up);
            else if(event.code == "ArrowDown") this.directions.push(Direction.Down);
            else if(event.code == "ArrowLeft") this.directions.push(Direction.Left);
            else if(event.code == "ArrowRight") this.directions.push(Direction.Right);
            else if(event.code == "Space") this.ms_mult = 0.5;
        });

        window.addEventListener("keyup", (event) => {
            if(event.code == "Space") this.ms_mult = 1;
        });

        window.addEventListener("keypress", (event) => {
            if(event.code == "KeyP") this.isAlive = false;
            if(event.code == "KeyA") this.growing = true;
            if(event.code == "KeyC") this.directions = [];
        });
    }

    checkState() {
        if(this.body.includes(this.head)) this.isAlive = false;
        if(this.head.element.classList.contains("apple")) {
            this.growing = true;
            this.head.element.classList.remove("apple");
            this.apples.create();
            this.ms -= 15;
        }
    }

    colourSnake() {
        this.head.element.classList.add("snake-head");
        for(const cell of this.body) {
            cell.element.classList.add("snake-body");
        }

        return this;
    }

    moveSnake() {
        this.direction = this.directions.shift() || this.direction; 

        var new_x = this.head.x;
        var new_y = this.head.y;

        if(this.direction == Direction.Up) new_y -= 1;
        else if(this.direction == Direction.Down) new_y += 1;
        else if(this.direction == Direction.Left) new_x -= 1;
        else if(this.direction == Direction.Right) new_x += 1;

        while(new_x < 0) new_x += this.board.width;
        while(new_y < 0) new_y += this.board.height;

        new_x %= this.board.width;
        new_y %= this.board.height;

        this.head.element.classList.remove("snake-head");
        this.head.element.classList.add("snake-body");
        this.body.push(this.head);
        this.head = this.board.cells[new_x][new_y];
        
        if(!this.growing) {
            this.body[0].element.classList.remove("snake-body");
            this.body.shift();
        }
        else this.growing = false;
    }
}