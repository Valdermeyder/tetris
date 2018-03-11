import {moveDown, moveLeft, moveRight} from '../piece/pieceMovements'
import {generateActivePiece} from '../piece/pieceActions'
import {changeBoardImages} from './boardActions'
import {gameOver} from '../appActions'
import {releaseFullyOccupiedRows} from './boardModifiers'
import {getPieceConfig, mapSpriteToBoardElement} from '../piece/pieceMappers'
import {occupyBoardCells} from './boardOccupiers'

const couldBeMovedDown = ({activePiece, board}, {x, y, width, height}) =>
	getPieceConfig(activePiece.texture.textureCacheIds[0]).couldBeShown(board, {x, y: y + 1, width, height})

export const moveToFloor = (appState, dispatch, speed) => {
	const boardPiece = mapSpriteToBoardElement(appState.activePiece, appState.tileSize, speed ? appState.tileSize - speed : 0)
	if (couldBeMovedDown(appState, boardPiece)) {
		moveDown(appState.activePiece, speed)
	} else {
		occupyBoardCells(appState, boardPiece)
		releaseFullyOccupiedRows(appState.board, boardPiece)
		dispatch(changeBoardImages())
		if (boardPiece.y === 0) {
			dispatch(gameOver())
		} else {
			dispatch(generateActivePiece())
		}
	}
}

const couldBeMovedRight = ({activePiece, board}, {x, y, width, height}) =>
	getPieceConfig(activePiece.texture.textureCacheIds[0]).couldBeShown(board, {x: x + 1, y, width, height})

export const moveToRight = (appState) => {
	const boardPiece = mapSpriteToBoardElement(appState.activePiece, appState.tileSize)
	if (couldBeMovedRight(appState, boardPiece)) {
		moveRight(appState.activePiece, appState.tileSize)
	}
}

const couldBeMovedLeft = ({activePiece, board}, {x, y, width, height}) =>
	getPieceConfig(activePiece.texture.textureCacheIds[0]).couldBeShown(board, {x: x - 1, y, width, height})

export const moveToLeft = (appState) => {
	const boardPiece = mapSpriteToBoardElement(appState.activePiece, appState.tileSize)
	if (couldBeMovedLeft(appState, boardPiece)) {
		moveLeft(appState.activePiece, appState.tileSize)
	}
}
