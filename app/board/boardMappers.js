export const mapColumnsToRows = (board, piece) => {
	const yFirstIndex = piece.y
	const yLastIndex = yFirstIndex + piece.height
	return board
		.map(column => column.filter((row, index) => index >= yFirstIndex && index < yLastIndex))
		.reduce((rows, column) => {
			column.forEach((row, index) => rows[index] = [...(rows[index] || []), row])
			return rows
		}, [])
}

export const calculatePieceIndexes = (piece) => {
	const columnFirstIndex = piece.x
	const columnLastIndex = columnFirstIndex + piece.width
	const rowFirstIndex = piece.y
	const rowLastIndex = rowFirstIndex + piece.height
	return {columnFirstIndex, columnLastIndex, rowFirstIndex, rowLastIndex}
}
