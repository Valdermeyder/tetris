import {Application, Container, loader, Sprite} from 'pixi.js/dist/pixi.min'
import assets from '../assets/*'
import {createBackground} from './Background'
import {generateActivePiece} from './ActivePiece'
import {moveDown} from './spriteUtils'

export const createApp = ({tileSize, wideCells, heightCells}) => {
	const appConfig = {width: tileSize * wideCells, height: tileSize * heightCells}
	const app = new Application(appConfig)
	loader.add(Object.entries(assets)).load(() => {
		app.stage.addChild(createBackground(appConfig, tileSize))
		const activePiece = generateActivePiece()
		app.stage.addChild(activePiece)
		app.ticker.add(moveDown(activePiece, appConfig.height))
	})
	return app.view
}
