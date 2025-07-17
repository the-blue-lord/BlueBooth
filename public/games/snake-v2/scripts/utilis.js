import Board from "./structures/Board";

export function initBoard(x) {
    var html_board = document.getElementById("board");
    const board = new Board(html_board, x, x);
    return board;
}

export const Direction = {
    Up: "Up",
    Down: "Down",
    Left: "Left",
    Right: "Right"
};