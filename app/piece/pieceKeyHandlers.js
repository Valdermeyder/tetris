import {moveDown, moveLeft, moveRight} from './pieceMovements'
import {CHANGE_ACTIVE_PIECE} from './actionTypes'
import {getRotatedPieceImage} from './pieceMappers'

const keyCodes = {
	leftArrow: 37,
	upArrow: 38,
	rightArrow: 39,
	downArrow: 40
}

export const getKeyDownHandler = (state, onAction) => event => {
	event.preventDefault()
	switch (event.keyCode) {
		case keyCodes.rightArrow:
			moveRight(state.activePiece, state.boundaries.right, state.tileSize)
			break
		case keyCodes.leftArrow:
			moveLeft(state.activePiece, state.boundaries.left, state.tileSize)
			break
		case keyCodes.upArrow:
			onAction({
				type: CHANGE_ACTIVE_PIECE,
				img: getRotatedPieceImage(state.activePiece.texture.textureCacheIds[0])
			})
			break
		case keyCodes.downArrow:
			moveDown(state.activePiece, state.boundaries.bottom, state.tileSize)
			break
	}
}
