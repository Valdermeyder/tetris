import {mapColumnsToRows, mapPieceCoordinatesToBoardIndexes, mapPieceYToRowIndex} from './boardMappers'
import {initBoardCell} from './boardGenerators'
import cyanBlock from '../../assets/block_cyan.png'

const occupyBoardCell = (column, rowIndex) => {
	column[rowIndex].free = false
	column[rowIndex].img = cyanBlock
}

export const occupyBorderCells = ({board, tileSize}, activePiece) => {
	const {columnFirstIndex, columnLastIndex, rowFirstIndex, rowLastIndex} = mapPieceCoordinatesToBoardIndexes(activePiece, tileSize)
	for (let columnIndex = columnFirstIndex; columnIndex < columnLastIndex; columnIndex++) {
		const column = board[columnIndex]
		for (let rowIndex = rowFirstIndex; rowIndex < rowLastIndex; rowIndex++) {
			occupyBoardCell(column, rowIndex)
		}
	}
}

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

export const releaseFullyOccupiedRows = ({board, tileSize}, activePiece) => {
	const occupiedRowsToColumns = mapColumnsToRows({board, tileSize}, activePiece)
	const markedOccupiedRows = occupiedRowsToColumns.reduce(toMarkedOccupiedRows(mapPieceYToRowIndex(activePiece, tileSize)), {})
	if (Object.entries(markedOccupiedRows).some(isOccupied)) {
		board.forEach(modifyColumn(markedOccupiedRows))
	}
}