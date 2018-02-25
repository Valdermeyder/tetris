import {Application, loader} from 'pixi.js/dist/pixi.min'
// eslint-disable-next-line import/no-unresolved
import assets from '../assets/*'
import {createBackground} from './Background'
import {generateActiveImg} from './piece/pieceGenerators'
import {moveDown} from './piece/pieceMovements'
import {getKeyDownHandler} from './piece/pieceKeyHandlers'
import {generateLoading} from './Loading'
import {CHANGE_ACTIVE_PIECE} from './piece/actionTypes'
import {createPieceSprite} from './piece/pieceCreators'

const onAction = (state, container) => action => {
	switch (action.type) {
		case CHANGE_ACTIVE_PIECE: {
			const newActivePiece = createPieceSprite(action.img, action.cfg)
			container.removeChild(state.activePiece)
			container.addChild(newActivePiece)
			state.activePiece = newActivePiece
		}
	}
}

export const createApp = ({tileSize, wideCells, heightCells}) => {
	const appConfig = {width: tileSize * wideCells, height: tileSize * heightCells}
	const appState = {boundaries: {left: 0, right: appConfig.width, bottom: appConfig.height}, tileSize}
	const app = new Application(appConfig)
	app.stage.addChild(generateLoading())
	loader.add(Object.entries(assets)).load(() => {
		app.stage.addChild(createBackground(appConfig, tileSize))
		appState.activePiece = createPieceSprite(generateActiveImg())
		window.addEventListener('keydown', getKeyDownHandler(appState, onAction(appState, app.stage)))
		app.stage.addChild(appState.activePiece)
		app.ticker.add(() => moveDown(appState.activePiece, appConfig.height))
	})
	return app.view
}
