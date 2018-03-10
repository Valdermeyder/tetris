import {getRotatedPieceImage} from '../piece/pieceMappers'
import {moveToFloor, moveToLeft, moveToRight} from './boardMovements'
import {changeActivePiece} from '../piece/pieceActions'

const keyCodes = {
	leftArrow: 37,
	upArrow: 38,
	rightArrow: 39,
	downArrow: 40
}

export const getArrowsHandler = (state, dispatch) => event => {
	switch (event.keyCode) {
		case keyCodes.rightArrow:
			event.preventDefault()
			moveToRight(state)
			break
		case keyCodes.leftArrow:
			event.preventDefault()
			moveToLeft(state)
			break
		case keyCodes.upArrow:
			event.preventDefault()
			dispatch(changeActivePiece(getRotatedPieceImage(state.activePiece.texture.textureCacheIds[0])))
			break
		case keyCodes.downArrow: {
			event.preventDefault()
			const moduleValue = state.activePiece.y % state.tileSize
			const speed = moduleValue === 0 ? state.tileSize : state.tileSize - moduleValue
			moveToFloor(state, dispatch, speed)
			break
		}
	}
}
