const isPositionFree = (board, x, y) => board[x] && board[x][y] && board[x][y].free

export const couldBeRotated = (board, rotatedPiece) => {
	for (let x = rotatedPiece.x; x < rotatedPiece.x + rotatedPiece.width; x++) {
		for (let y = rotatedPiece.y; y < rotatedPiece.y + rotatedPiece.height; y++) {
			if (!isPositionFree(board, x, y)) {
				return false
			}
		}
	}
	return true
}