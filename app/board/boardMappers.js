export const mapColumnsToRows = ({board, activePiece, tileSize}) => {
	const yFirstIndex = Math.round(activePiece.y / tileSize)
	const yLastIndex = yFirstIndex + Math.round(activePiece.height / tileSize)
	return board
		.map(column => column.filter((row, index) => index >= yFirstIndex && index < yLastIndex))
		.reduce((rows, column) => {
			column.forEach((row, index) => rows[index] = [...(rows[index] || []), row])
			return rows
		}, [])
}

export const mapPieceYToRowIndex = (piece, tileSize) => {
	return Math.round(piece.y / tileSize)
}

export const mapPieceCoordinatesToBoardIndexes = (piece, tileSize) => {
	const columnFirstIndex = piece.x / tileSize
	const columnLastIndex = columnFirstIndex + piece.width / tileSize
	const rowFirstIndex = mapPieceYToRowIndex(piece, tileSize)
	const rowLastIndex = rowFirstIndex + Math.round(piece.height / tileSize)
	return {columnFirstIndex, columnLastIndex, rowFirstIndex, rowLastIndex}
}