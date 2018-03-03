import {moveDown, moveLeft, moveRight} from '../piece/pieceMovements'
import cyanBlock from '../../assets/block_cyan.png'
import {generateActivePiece} from '../piece/pieceActions'
import {changeBoardImages} from './boardActions'
import {gameOver} from '../appActions'

const getColumnFloor = column => {
	for (let y = 0; y < column.length; y++) {
		if (!column[y].free) {
			return y
		}
	}
	return column.length
}

const occupyBorderCells = appState => {
	const xFirstIndex = Math.round(appState.activePiece.x / appState.tileSize)
	const xLength = Math.round(appState.activePiece.width / appState.tileSize)
	const yFirstIndex = Math.round(appState.activePiece.y / appState.tileSize)
	const yLength = Math.round(appState.activePiece.height / appState.tileSize)
	for (let x = xFirstIndex; x < xFirstIndex + xLength; x++) {
		const column = appState.board[x]
		for (let y = yFirstIndex; y < yFirstIndex + yLength; y++) {
			column[y].free = false
			column[y].img = cyanBlock
		}
	}
}

const couldBeMovedDown = (sprite, floor, speed = 1) => sprite.y <= floor - sprite.height - speed

export const moveToFloor = (appState, dispatch, speed) => {
	const columnFloor = getColumnFloor(appState.board[appState.activePiece.x / appState.tileSize]) * appState.tileSize
	if (columnFloor === 0) {
		dispatch(gameOver())
	} else if (couldBeMovedDown(appState.activePiece, columnFloor, speed)) {
		moveDown(appState.activePiece, speed)
	} else {
		occupyBorderCells(appState)
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

const mapColumnsToRows = ({board, activePiece, tileSize}) => {
	const yFirstIndex = Math.round(activePiece.y / tileSize)
	const yLastIndex = yFirstIndex + Math.round(activePiece.height / tileSize)
	return board
		.map(column => column.filter((row, index) => index >= yFirstIndex && index <= yLastIndex))
		.reduce((rows, column) => {
			column.forEach((row, index) => rows[index] = [...(rows[index] || []), row])
			return rows
		}, [])
}

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
