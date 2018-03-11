import {CHANGE_ACTIVE_PIECE, GENERATE_ACTIVE_PIECE} from './piece/pieceActionTypes'
import {createPieceSprite} from './piece/pieceCreators'
import {generateActivePieceImg} from './piece/pieceGenerators'
import {createBackground} from './Background'
import {CHANGE_BOARD_IMAGES} from './board/boardActionTypes'
import {GAME_OVER} from './appActionTypes'
import {generateGameOver} from './textSprites'

export const onAction = state => action => {
	switch (action.type) {
		case CHANGE_ACTIVE_PIECE: {
			const newActivePiece = createPieceSprite(action.img, action.cfg)
			state.container.removeChild(state.activePiece)
			state.container.addChild(newActivePiece)
			state.activePiece = newActivePiece
			break
		}
		case GENERATE_ACTIVE_PIECE: {
			const newActivePiece = createPieceSprite(generateActivePieceImg(), {x: 3 * state.tileSize})
			state.container.removeChild(state.activePiece)
			state.container.addChild(newActivePiece)
			state.activePiece = newActivePiece
			break
		}
		case CHANGE_BOARD_IMAGES: {
			state.container.addChild(createBackground(state))
			break
		}
		case GAME_OVER: {
			state.container.addChild(generateGameOver())
			state.onDestroy.forEach(destroy => destroy())
		}
	}
}