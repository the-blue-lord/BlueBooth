function initBoard() {
    var html_board = document.getElementById("board");
    const board = new Board(html_board, 20, 20);
    return board;
}

const Direction = {
    Up: "Up",
    Down: "Down",
    Left: "Left",
    Right: "Right"
};