const isPositionFree = (board, x, y) => board[x] && board[x][y] && board[x][y].free

export const couldSquareBeShown = (board, piece) => {
	for (let x = piece.x; x < piece.x + piece.width; x++) {
		for (let y = piece.y; y < piece.y + piece.height; y++) {
			if (!isPositionFree(board, x, y)) {
				return false
			}
		}
	}
	return true
}

export const couldSVerticalBeShown = (board, {x, y, width, height}) => {
	return isPositionFree(board, x, y)
		&& isPositionFree(board, x + width - 1, y + height - 1)
		&& couldSquareBeShown(board, {x, width, y: y + 1, height: height - 2})
}

export const couldSHorizontalBeShown = (board, {x, y, width, height}) => {
	return isPositionFree(board, x, y + height - 1)
		&& isPositionFree(board, x + width - 1, y)
		&& couldSquareBeShown(board, {y, height, x: x + 1, width: width - 2})
}
