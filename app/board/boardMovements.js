import {moveDown, moveLeft, moveRight} from '../piece/pieceMovements'
import {generateActivePiece} from '../piece/pieceActions'
import {changeBoardImages} from './boardActions'
import {gameOver} from '../appActions'
import {mapColumnsToRows, mapSpriteToBoardElement} from './boardMappers'
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

const getActivePieceColumns = ({board}, activePiece) => {
	const xFirstIndex = activePiece.x
	const xLastIndex = xFirstIndex + activePiece.width
	return board.filter((column, index) => index >= xFirstIndex && index < xLastIndex)
}

const couldBeMovedDown = (sprite, floor) => sprite.y < floor - sprite.height

export const moveToFloor = (appState, dispatch, speed) => {
	const boardPiece = mapSpriteToBoardElement(appState.activePiece, appState.tileSize, speed ? appState.tileSize - speed : 0)
	const columnFloor = getLowestColumnFloor(getActivePieceColumns(appState, boardPiece), boardPiece.y)
	if (columnFloor === 0) {
		dispatch(gameOver())
	} else if (couldBeMovedDown(boardPiece, columnFloor, speed)) {
		moveDown(appState.activePiece, speed)
	} else {
		occupyBorderCells(appState, boardPiece)
		releaseFullyOccupiedRows(appState, boardPiece)
		dispatch(changeBoardImages())
		dispatch(generateActivePiece())
	}
}

const couldBeMovedRight = (piece, rightBoundary) => piece.x < rightBoundary - piece.width

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
	const boardPiece = mapSpriteToBoardElement(appState.activePiece, appState.tileSize)
	const rightBorder = getLowestRightBorder(mapColumnsToRows(appState, boardPiece), boardPiece.x)
	if (couldBeMovedRight(boardPiece, rightBorder)) {
		moveRight(appState.activePiece, appState.tileSize)
	}
}

const couldBeMovedLeft = (piece, leftBoundary) => piece.x > leftBoundary

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
	const boardPiece = mapSpriteToBoardElement(appState.activePiece, appState.tileSize)
	const leftBorder = getBiggestLeftBorder(mapColumnsToRows(appState, boardPiece), boardPiece.x)
	if (couldBeMovedLeft(boardPiece, leftBorder)) {
		moveLeft(appState.activePiece, appState.tileSize)
	}
}
