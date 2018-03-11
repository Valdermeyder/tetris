import {couldSquareBeShown, couldSVerticalBeShown, couldSHorizontalBeShown} from '../piece/pieceTests'
import {i13, i24, o1234, s13, s24} from './pieceTypes'

const piecesMap = {
	[i13]: {
		piece: {img: i24, width: 1, height: 4}, changeX: (x) => x + 2, changeY: (y) => y - 1,
		couldBeShown: couldSquareBeShown
	},
	[i24]: {
		piece: {img: i13, width: 4, height: 1}, changeX: (x) => x - 2, changeY: (y) => y + 1,
		couldBeShown: couldSquareBeShown
	},
	[o1234]: {
		couldBeShown: couldSquareBeShown
	},
	[s13]: {
		piece: {img: s24, width: 2, height: 4}, changeX: (x) => x + 1, changeY: (y) => y - 1,
		couldBeShown: couldSHorizontalBeShown
	},
	[s24]: {
		piece: {img: s13, width: 4, height: 2}, changeX: (x) => x - 1, changeY: (y) => y + 1,
		couldBeShown: couldSVerticalBeShown
	}
}

export const getRotatedPieceCfg = (sprite, tileSize) => {
	const rotatedCfg = piecesMap[sprite.texture.textureCacheIds[0]]
	return rotatedCfg && rotatedCfg.piece && Object.assign({}, rotatedCfg.piece, {
		x: rotatedCfg.changeX(mapSpriteCoordinate(sprite.x, tileSize)),
		y: rotatedCfg.changeY(mapSpriteCoordinate(sprite.y, tileSize))
	})
}

export const getPieceConfig = (pieceType) => piecesMap[pieceType]

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
