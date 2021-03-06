import {mapColumnsToRows} from './boardMappers'
import {initBoardCell} from './boardGenerators'

const toMarkedOccupiedRows = firstIndex => (map, row) => {
	map[firstIndex++] = row.every(column => !column.free)
	return map
}

const modifyRow = column => (newIndex, newColumn) => {
	column[newIndex] = newColumn
	return newIndex + 1
}

let initFirstRows = (removedRowsCount, column) => {
	for (let columnIndex = 0; columnIndex < removedRowsCount; columnIndex++) {
		column[columnIndex] = initBoardCell()
	}
}

const modifyColumn = markedOccupiedRows => column => {
	const rowsWithoutFullyOccupied = column.filter((row, index) => !markedOccupiedRows[index])
	const removedRowsCount = column.length - rowsWithoutFullyOccupied.length
	if (removedRowsCount > 0) {
		initFirstRows(removedRowsCount, column)
		rowsWithoutFullyOccupied.reduce(modifyRow(column), removedRowsCount)
	}
}

const isOccupied = occupied => occupied

export const releaseFullyOccupiedRows = (board, boardPiece) => {
	const occupiedRowsToColumns = mapColumnsToRows(board, boardPiece)
	const markedOccupiedRows = occupiedRowsToColumns.reduce(toMarkedOccupiedRows(boardPiece.y), {})
	if (Object.entries(markedOccupiedRows).some(isOccupied)) {
		board.forEach(modifyColumn(markedOccupiedRows))
	}
}