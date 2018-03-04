import {moveDown, moveLeft, moveRight} from '../piece/pieceMovements'
import {generateActivePiece} from '../piece/pieceActions'
import {changeBoardImages} from './boardActions'
import {gameOver} from '../appActions'
import {mapColumnsToRows} from './boardMappers'
import {occupyBorderCells, releaseFullyOccupiedRows} from './boardModifiers'

const getColumnFloor = (column, startY = 0) => {
	for (let y = startY; y < column.length; y++) {
		if (!column[y].free) {
			return y
		}
	}
	return column.length
}

const getLowestColumnFloor = (columns, startY) => Math.min(...columns.map(column => getColumnFloor(column, startY)))

const getActivePieceColumns = ({board, activePiece, tileSize}) => {
	const xFirstIndex = Math.round(activePiece.x / tileSize)
	const xLastIndex = xFirstIndex + Math.round(activePiece.width / tileSize)
	return board.filter((column, index) => index >= xFirstIndex && index < xLastIndex)
}

const couldBeMovedDown = (sprite, floor, speed = 1) => sprite.y <= floor - sprite.height - speed

export const moveToFloor = (appState, dispatch, speed) => {
	const columnFloor = getLowestColumnFloor(getActivePieceColumns(appState), Math.round(appState.activePiece.y / appState.tileSize)) * appState.tileSize
	if (columnFloor === 0) {
		dispatch(gameOver())
	} else if (couldBeMovedDown(appState.activePiece, columnFloor, speed)) {
		moveDown(appState.activePiece, speed)
	} else {
		occupyBorderCells(appState)
		releaseFullyOccupiedRows(appState)
		dispatch(changeBoardImages())
		dispatch(generateActivePiece())
	}
}

const couldBeMovedRight = (sprite, rightBoundary, step) => sprite.x <= rightBoundary - sprite.width - step

const getRowRightBorder = (row, startX = 0) => {
	for (let x = startX; x < row.length; x++) {
		if (!row[x].free) {
			return x
		}
	}
	return row.length
}
const getLowestRightBorder = (rows, startX) => Math.min(...rows.map(row => getRowRightBorder(row, startX)))

export const moveToRight = (appState) => {
	const rightBorder = getLowestRightBorder(mapColumnsToRows(appState), appState.activePiece.x / appState.tileSize) * appState.tileSize
	if (couldBeMovedRight(appState.activePiece, rightBorder, appState.tileSize)) {
		moveRight(appState.activePiece, appState.tileSize)
	}
}

const couldBeMovedLeft = (sprite, leftBoundary, step) => sprite.x >= leftBoundary + step

const getRowLeftBorder = (row, startX = row.length - 1) => {
	for (let x = startX; x >= 0; x--) {
		if (!row[x].free) {
			return x + 1
		}
	}
	return 0
}

const getBiggestLeftBorder = (rows, startX) => Math.max(...rows.map(row => getRowLeftBorder(row, startX)))

export const moveToLeft = (appState) => {
	const leftBorder = getBiggestLeftBorder(mapColumnsToRows(appState), appState.activePiece.x / appState.tileSize) * appState.tileSize
	if (couldBeMovedLeft(appState.activePiece, leftBorder, appState.tileSize)) {
		moveLeft(appState.activePiece, appState.tileSize)
	}
}
