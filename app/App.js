import {Application, Sprite, loader} from 'pixi.js/dist/pixi.min'
import assets from '../assets/*'

const backgroundImg = assets['background.png']

export const createApp = ({tileSize, wideCells, heightCells}) => {
	const appConfig = {width: tileSize * wideCells, height: tileSize * heightCells}
	const app = new Application(appConfig)
	loader.add(backgroundImg).load(() => {
		for (let x = 0; x < appConfig.width; x += tileSize) {
			for (let y = 0; y < appConfig.height; y += tileSize) {
				const background = new Sprite(loader.resources[backgroundImg].texture)
				background.position.set(x, y)
				app.stage.addChild(background)
			}
		}
	})
	return app.view
}
