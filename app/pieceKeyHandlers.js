import {moveLeft, moveRight} from './pieceMovementHandlers'

export const getKeyDownHandler = (pieceSprite, appConfig, tileSize) => event => {
	switch (event.keyCode) {
		case 39:
			moveRight(pieceSprite, appConfig.width, tileSize)()
			break
		case 37:
			moveLeft(pieceSprite, 0, tileSize)()
			break
	}
	event.preventDefault()
}
