import iHorizontalImg from '../../assets/I_1-3.png'
import iVerticalImg from '../../assets/I_2-4.png'

const rotateMap = {
	[iHorizontalImg]: {img: iVerticalImg, changeX: (x) => x + 2, changeY: (y) => y, width: 1, height: 4},
	[iVerticalImg]: {img: iHorizontalImg, changeX: (x) => x - 2, changeY: (y) => y + 2, width: 4, height: 1}
}

export const getRotatedPieceImage = image => rotateMap[image].img

export const getRotatedPiece = (sprite, tileSize) => {
	const currentPiece = sprite.texture.textureCacheIds[0]
	const rotatedCfg = rotateMap[currentPiece]
	return rotatedCfg && {
		img: rotatedCfg.img,
		x: rotatedCfg.changeX(mapSpriteCoordinate(sprite.x, tileSize)),
		y: rotatedCfg.changeY(mapSpriteCoordinate(sprite.y, tileSize)),
		width: rotatedCfg.width,
		height: rotatedCfg.height
	}
}

export const mapSpriteCoordinate = (coordinate, divider = 1, diff = 0) =>
	Math.round((coordinate + diff) / divider)

export const mapSpriteToBoardElement = (sprite, tileSize, yDiff = 0) => {
	return {
		x: mapSpriteCoordinate(sprite.x, tileSize),
		y: mapSpriteCoordinate(sprite.y, tileSize, -yDiff),
		width: Math.round(sprite.width / tileSize),
		height: Math.round(sprite.height / tileSize)
	}
}