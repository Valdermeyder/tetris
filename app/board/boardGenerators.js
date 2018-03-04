import backgroundImg from '../../assets/background.png'

export const initBoardCell = () => ({free: true, img: backgroundImg})

const initBoardRow = (heightCells) => {
	const boardRow = []
	for (let y = 0; y < heightCells; y++) {
		boardRow[y] = initBoardCell()
	}
	return boardRow
}

export const initBoardState = (wideCells, heightCells) => {
	const boardState = []
	for (let x = 0; x < wideCells; x++) {
		boardState[x] = initBoardRow(heightCells)
	}
	return boardState
}
