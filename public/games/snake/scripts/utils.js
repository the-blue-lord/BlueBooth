export function initBoard(x) {
    var html_board = document.getElementById("board");
    const board = new Board(html_board, x, x);
    return board;
}

export function boundInRange(value, limit1, limit2) {
    const min = Math.min(limit1, limit2);
    const max = Math.max(limit1, limit2);

    if (value < min) return min;
    if (value > max) return max;
    return value;
}

export const Direction = {
    Null: 0,
    Up: -1,
    Down: 1,
    Left: -2,
    Right: 2,
    Horizontal: 2,
    Vertical: 1
};