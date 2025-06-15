class Snake {
    constructor(board, apples, length) {
        this.isAlive = true;
        this.ms = 700;
        this.ms_mult = 1;
        this.growing = false;

        this.lengthRendered = 1;

        this.colourFunction = () => {};
        this.board = board;
        this.apples = apples;
        this.length = length;

        this.head = this.board.cells[0][0];
        this.direction = Direction.Right;
        this.directions = [];

        this.body = [];

        this.eatingAudio = new Audio("audios/snake-eats.mp3");

        window.addEventListener("keydown", (event) => {
            if(
                this.directions[0] != Direction.Up &&
                (event.code == "ArrowUp" || event.code == "KeyW")
            ) this.directions.unshift(Direction.Up);

            else if(
                this.directions[0] != Direction.Down && 
                (event.code == "ArrowDown" || event.code == "KeyS")
            ) this.directions.unshift(Direction.Down);

            else if(
                this.directions[0] != Direction.Left &&
                (event.code == "ArrowLeft" || event.code == "KeyA")
            ) this.directions.unshift(Direction.Left);

            else if(
                this.directions[0] != Direction.Right &&
                (event.code == "ArrowRight" || event.code == "KeyD")
            ) this.directions.unshift(Direction.Right);

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
        this.colourFunction();
        this.colourFunction = () => {};

        this.head.element.classList.add("snake-head");
        for(const cell of this.body) {
            cell.element.classList.add("snake-body");
        }

        return this;
    }

    moveSnake() {
        this.direction = this.directions.pop() || this.direction; 

        var new_x = this.head.x;
        var new_y = this.head.y;

        if(this.direction == Direction.Up) new_y -= 1;
        else if(this.direction == Direction.Down) new_y += 1;
        else if(this.direction == Direction.Left) new_x -= 1;
        else if(this.direction == Direction.Right) new_x += 1;

        if(new_x < 0 || new_x > this.board.width-1 || new_y < 0 || new_y > this.board.height-1) {
            this.isAlive = false;
            return;
        }

        const tmpFct = this.colourFunction;
        const head = this.head;

        this.colourFunction = () => {
            tmpFct();
            head.element.classList.remove("snake-head");
            head.element.classList.add("snake-body");
        }
        this.body.push(this.head);
        this.head = this.board.cells[new_x][new_y];
        
        if(!this.growing && this.lengthRendered >= this.length) {
            const tmpFct2 = this.colourFunction;
            const lastBody = this.body[0];

            this.colourFunction = () => {
                tmpFct2();
                lastBody.element.classList.remove("snake-body");
            }
            this.body.shift();
        }
        else if (this.growing) {
            this.length++;
            this.eatingAudio.play();
            this.lengthRendered++;
            this.growing = false;
        }
        else if (this.lengthRendered < this.length) {
            this.lengthRendered++;

        }
    }
}