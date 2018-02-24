import {Container, Sprite, loader} from 'pixi.js/dist/pixi.min'
import backgroundImg from '../assets/background.png'

export const createBackground = ({width, height}, tileSize) => {
	const backgroundContainer = new Container()
	for (let x = 0; x < width; x += tileSize) {
		for (let y = 0; y < height; y += tileSize) {
			const background = new Sprite(loader.resources[backgroundImg].texture)
			background.position.set(x, y)
			backgroundContainer.addChild(background)
		}
	}
	return backgroundContainer
}