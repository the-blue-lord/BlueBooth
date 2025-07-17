import Board from "./structures/Board";

export function initBoard(x) {
    var html_board = document.getElementById("board");
    const board = new Board(html_board, x, x);
    return board;
}

export const Direction = {
    Null: 0,
    Up: -1,
    Down: 1,
    Left: 2,
    Right: -2,
    Horizontal: 2,
    Vertical: 1
};