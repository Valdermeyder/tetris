import {calculatePieceIndexes} from './boardMappers'
import cyanBlock from '../../assets/block_cyan.png'
import yellowBlock from '../../assets/block_yellow.png'
import greenBlock from '../../assets/block_green.png'
import redBlock from '../../assets/block_red.png'
import blueBlock from '../../assets/block_blue.png'
import orangeBlock from '../../assets/block_orange.png'
import purpleBlock from '../../assets/block_purple.png'
import {i13, i24, j1, j2, j3, j4, l1, l2, l3, l4, o1234, s13, s24, t1, t2, t3, t4, z13, z24} from '../piece/pieceTypes'

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

const occupyJ1 = img => (board, {x, y, width, height}) => {
	occupyBoardCell(board[x], y, img)
	occupySquareBorderCells(img)(board, {x, width, y: y + 1, height: height - 1})
}

const occupyJ2 = img => (board, {x, y, width, height}) => {
	occupyBoardCell(board[x + width - 1], y, img)
	occupySquareBorderCells(img)(board, {x, width: 1, y, height})
}

const occupyJ3 = img => (board, {x, y, width, height}) => {
	occupyBoardCell(board[x + width - 1], y + height - 1, img)
	occupySquareBorderCells(img)(board, {x, width, y, height: 1})
}

const occupyJ4 = img => (board, {x, y, height}) => {
	occupyBoardCell(board[x], y + height - 1, img)
	occupySquareBorderCells(img)(board, {x: x + 1, width: 1, y, height})
}

const occupyL1 = img => (board, {x, y, width, height}) => {
	occupyBoardCell(board[x + width - 1], y, img)
	occupySquareBorderCells(img)(board, {x, width, y: y + 1, height: height - 1})
}

const occupyL2 = img => (board, {x, y, width, height}) => {
	occupyBoardCell(board[x + width - 1], y + height - 1, img)
	occupySquareBorderCells(img)(board, {x, width: 1, y, height})
}

const occupyL3 = img => (board, {x, y, width, height}) => {
	occupyBoardCell(board[x], y + height - 1, img)
	occupySquareBorderCells(img)(board, {x, width, y, height: 1})
}

const occupyL4 = img => (board, {x, y, height}) => {
	occupyBoardCell(board[x], y, img)
	occupySquareBorderCells(img)(board, {x: x + 1, width: 1, y, height})
}

const occupyT1 = img => (board, {x, y, width, height}) => {
	occupyBoardCell(board[x + 1], y, img)
	occupySquareBorderCells(img)(board, {x, width, y: y + 1, height: height - 1})
}

const occupyT2 = img => (board, {x, y, width, height}) => {
	occupyBoardCell(board[x + width - 1], y + 1, img)
	occupySquareBorderCells(img)(board, {x, width: 1, y, height})
}

const occupyT3 = img => (board, {x, y, width, height}) => {
	occupyBoardCell(board[x + 1], y + height - 1, img)
	occupySquareBorderCells(img)(board, {x, width, y, height: 1})
}

const occupyT4 = img => (board, {x, y, height}) => {
	occupyBoardCell(board[x], y + 1, img)
	occupySquareBorderCells(img)(board, {x: x + 1, width: 1, y, height})
}

const occupyMap = {
	[i13]: occupySquareBorderCells(cyanBlock),
	[i24]: occupySquareBorderCells(cyanBlock),
	[o1234]: occupySquareBorderCells(yellowBlock),
	[s13]: occupySHorizontal(greenBlock),
	[s24]: occupySVertical(greenBlock),
	[z13]: occupyZHorizontal(redBlock),
	[z24]: occupyZVertical(redBlock),
	[j1]: occupyJ1(blueBlock),
	[j2]: occupyJ2(blueBlock),
	[j3]: occupyJ3(blueBlock),
	[j4]: occupyJ4(blueBlock),
	[l1]: occupyL1(orangeBlock),
	[l2]: occupyL2(orangeBlock),
	[l3]: occupyL3(orangeBlock),
	[l4]: occupyL4(orangeBlock),
	[t1]: occupyT1(purpleBlock),
	[t2]: occupyT2(purpleBlock),
	[t3]: occupyT3(purpleBlock),
	[t4]: occupyT4(purpleBlock)
}

export const occupyBoardCells = ({activePiece, board}, boardPiece) => {
	occupyMap[activePiece.texture.textureCacheIds[0]](board, boardPiece)
}
