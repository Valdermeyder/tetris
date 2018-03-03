import {Container, loader, Sprite} from 'pixi.js/dist/pixi.min'

export const createBackground = ({boundaries: {right: width, bottom: height}, tileSize, board}) => {
	const backgroundContainer = new Container()
	for (let x = 0; x < width; x += tileSize) {
		for (let y = 0; y < height; y += tileSize) {
			const background = new Sprite(loader.resources[board[x/tileSize][y/tileSize].img].texture)
			background.position.set(x, y)
			backgroundContainer.addChild(background)
		}
	}
	return backgroundContainer
}