import {i13, i24, j1, j2, j3, j4, l1, l2, l3, l4, o1234, s13, s24, t1, t2, t3, t4, z13, z24} from './pieceTypes'
import {
	couldJ1BeShown,
	couldJ2BeShown,
	couldJ3BeShown,
	couldJ4BeShown,
	couldL1BeShown,
	couldL2BeShown,
	couldL3BeShown,
	couldL4BeShown,
	couldT1BeShown,
	couldT2BeShown,
	couldT3BeShown,
	couldT4BeShown,
	couldSHorizontalBeShown,
	couldSquareBeShown,
	couldSVerticalBeShown,
	couldZHorizontalBeShown,
	couldZVerticalBeShown
} from './pieceTests'

const piecesMap = {
	[i13]: {
		piece: {img: i24, width: 1, height: 4}, changeX: x => x + 2, changeY: y => y - 1,
		couldBeShown: couldSquareBeShown
	},
	[i24]: {
		piece: {img: i13, width: 4, height: 1}, changeX: x => x - 2, changeY: y => y + 1,
		couldBeShown: couldSquareBeShown
	},
	[o1234]: {
		couldBeShown: couldSquareBeShown
	},
	[s13]: {
		piece: {img: s24, width: 2, height: 4}, changeX: x => x + 1, changeY: y => y - 1,
		couldBeShown: couldSHorizontalBeShown
	},
	[s24]: {
		piece: {img: s13, width: 4, height: 2}, changeX: x => x - 1, changeY: y => y + 1,
		couldBeShown: couldSVerticalBeShown
	},
	[z13]: {
		piece: {img: z24, width: 2, height: 4}, changeX: x => x + 1, changeY: y => y - 1,
		couldBeShown: couldZHorizontalBeShown
	},
	[z24]: {
		piece: {img: z13, width: 4, height: 2}, changeX: x => x - 1, changeY: y => y + 1,
		couldBeShown: couldZVerticalBeShown
	},
	[j1]: {
		piece: {img: j2, width: 2, height: 4}, changeX: x => x + 1, changeY: y => y,
		couldBeShown: couldJ1BeShown
	},
	[j2]: {
		piece: {img: j3, width: 4, height: 2}, changeX: x => x - 1, changeY: y => y + 1,
		couldBeShown: couldJ2BeShown
	},
	[j3]: {
		piece: {img: j4, width: 2, height: 4}, changeX: x => x, changeY: y => y - 1,
		couldBeShown: couldJ3BeShown
	},
	[j4]: {
		piece: {img: j1, width: 4, height: 2}, changeX: x => x, changeY: y => y,
		couldBeShown: couldJ4BeShown
	},
	[l1]: {
		piece: {img: l2, width: 2, height: 4}, changeX: x => x + 1, changeY: y => y,
		couldBeShown: couldL1BeShown
	},
	[l2]: {
		piece: {img: l3, width: 4, height: 2}, changeX: x => x - 1, changeY: y => y + 1,
		couldBeShown: couldL2BeShown
	},
	[l3]: {
		piece: {img: l4, width: 2, height: 4}, changeX: x => x, changeY: y => y - 1,
		couldBeShown: couldL3BeShown
	},
	[l4]: {
		piece: {img: l1, width: 4, height: 2}, changeX: x => x, changeY: y => y,
		couldBeShown: couldL4BeShown
	},
	[t1]: {
		piece: {img: t2, width: 2, height: 4}, changeX: x => x + 1, changeY: y => y,
		couldBeShown: couldT1BeShown
	},
	[t2]: {
		piece: {img: t3, width: 4, height: 2}, changeX: x => x - 1, changeY: y => y + 1,
		couldBeShown: couldT2BeShown
	},
	[t3]: {
		piece: {img: t4, width: 2, height: 4}, changeX: x => x, changeY: y => y - 1,
		couldBeShown: couldT3BeShown
	},
	[t4]: {
		piece: {img: t1, width: 4, height: 2}, changeX: x => x, changeY: y => y,
		couldBeShown: couldT4BeShown
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
	Math.ceil((coordinate + diff) / divider)

export const mapSpriteToBoardElement = (sprite, tileSize, yDiff = 0) => {
	return {
		x: mapSpriteCoordinate(sprite.x, tileSize),
		y: mapSpriteCoordinate(sprite.y, tileSize, -yDiff),
		width: Math.round(sprite.width / tileSize),
		height: Math.round(sprite.height / tileSize)
	}
}
