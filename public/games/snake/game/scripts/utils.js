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

// socket.io exports

export function drawGui(game_data, player_id, canvas_context) {
    canvas_context.fillRect(0, 0, game_data.board_size*game_data.cell_size);
    canvas_context.save();
    //canvas_context.translate(game_data.viewport_size/2 - game_data.snakes[player_id].head.o);

    canvas_context.restore();
}