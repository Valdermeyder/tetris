export const mapColumnsToRows = ({board}, activePiece) => {
	const yFirstIndex = activePiece.y
	const yLastIndex = yFirstIndex + activePiece.height
	return board
		.map(column => column.filter((row, index) => index >= yFirstIndex && index < yLastIndex))
		.reduce((rows, column) => {
			column.forEach((row, index) => rows[index] = [...(rows[index] || []), row])
			return rows
		}, [])
}

export const mapPieceYToRowIndex = (piece) => {
	return piece.y
}

export const mapPieceCoordinatesToBoardIndexes = (piece, tileSize) => {
	const columnFirstIndex = piece.x
	const columnLastIndex = columnFirstIndex + piece.width
	const rowFirstIndex = mapPieceYToRowIndex(piece, tileSize)
	const rowLastIndex = rowFirstIndex + piece.height
	return {columnFirstIndex, columnLastIndex, rowFirstIndex, rowLastIndex}
}
