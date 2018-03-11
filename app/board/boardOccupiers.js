import {calculatePieceIndexes} from './boardMappers'
import cyanBlock from '../../assets/block_cyan.png'
import yellowBlock from '../../assets/block_yellow.png'
import greenBlock from '../../assets/block_green.png'
import redBlock from '../../assets/block_red.png'
import {i13, i24, o1234, s13, s24, z13, z24} from '../piece/pieceTypes'

const occupyBoardCell = (column, rowIndex, img = cyanBlock) => {
	column[rowIndex].free = false
	column[rowIndex].img = img
}

const occupySquareBorderCells = img => (board, piece) => {
	const {columnFirstIndex, columnLastIndex, rowFirstIndex, rowLastIndex} = calculatePieceIndexes(piece)
	for (let columnIndex = columnFirstIndex; columnIndex < columnLastIndex; columnIndex++) {
		const column = board[columnIndex]
		for (let rowIndex = rowFirstIndex; rowIndex < rowLastIndex; rowIndex++) {
			occupyBoardCell(column, rowIndex, img)
		}
	}
}

const occupySHorizontal = img => (board, {x, y, width, height}) => {
	occupyBoardCell(board[x], y + height - 1, img)
	occupyBoardCell(board[x + width - 1], y, img)
	occupySquareBorderCells(img)(board, {y, height, x: x + 1, width: width - 2})
}

const occupySVertical = img => (board, {x, y, width, height}) => {
	occupyBoardCell(board[x], y, img)
	occupyBoardCell(board[x + width - 1], y + height - 1, img)
	occupySquareBorderCells(img)(board, {x, width, y: y + 1, height: height - 2})
}

const occupyZHorizontal = img => (board, {x, y, width, height}) => {
	occupyBoardCell(board[x], y, img)
	occupyBoardCell(board[x + width - 1], y + height - 1, img)
	occupySquareBorderCells(img)(board, {y, height, x: x + 1, width: width - 2})
}

const occupyZVertical = img => (board, {x, y, width, height}) => {
	occupyBoardCell(board[x + width - 1], y, img)
	occupyBoardCell(board[x], y + height - 1, img)
	occupySquareBorderCells(img)(board, {x, width, y: y + 1, height: height - 2})
}

const occupyMap = {
	[i13]: {occupy: occupySquareBorderCells(cyanBlock)},
	[i24]: {occupy: occupySquareBorderCells(cyanBlock)},
	[o1234]: {occupy: occupySquareBorderCells(yellowBlock)},
	[s13]: {occupy: occupySHorizontal(greenBlock)},
	[s24]: {occupy: occupySVertical(greenBlock)},
	[z13]: {occupy: occupyZHorizontal(redBlock)},
	[z24]: {occupy: occupyZVertical(redBlock)}
}

export const occupyBoardCells = ({activePiece, board}, boardPiece) => {
	occupyMap[activePiece.texture.textureCacheIds[0]].occupy(board, boardPiece)
}
