import {Application, loader} from 'pixi.js/dist/pixi.min'
// eslint-disable-next-line import/no-unresolved
import assets from '../assets/*.png'
import {createBackground} from './Background'
import {generateActiveImg} from './piece/pieceGenerators'
import {getArrowsHandler} from './board/boardKeyHandlers'
import {generateLoading} from './textSprites'
import {createPieceSprite} from './piece/pieceCreators'
import {initBoardState} from './board/boardGenerators'
import {moveToFloor} from './board/boardMovements'
import {onAction} from './appActionHandlers'

export const createApp = ({tileSize, wideCells, heightCells}) => {
	const appConfig = {width: tileSize * wideCells, height: tileSize * heightCells}
	const appState = {
		boundaries: {left: 0, right: appConfig.width, bottom: appConfig.height},
		tileSize,
		board: initBoardState(wideCells, heightCells),
		onDestroy: []
	}
	const app = new Application(appConfig)
	appState.container = app.stage
	app.stage.addChild(generateLoading())
	loader.add(Object.entries(assets)).load(() => {
		app.stage.addChild(createBackground(appState))
		appState.activePiece = createPieceSprite(generateActiveImg())
		const dispatch = onAction(appState)
		const arrowsKeyDownHandler = getArrowsHandler(appState, dispatch)
		window.addEventListener('keydown', arrowsKeyDownHandler)
		app.stage.addChild(appState.activePiece)
		app.ticker.add(() => moveToFloor(appState, dispatch))
		appState.onDestroy.push(app.ticker.stop.bind(app.ticker), () => window.removeEventListener('keydown', arrowsKeyDownHandler))
	})
	return app.view
}
