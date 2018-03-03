import backgroundImg from '../../assets/background.png'

export const initBoardState = (wideCells, heightCells) => {
	const boardState = []
	for (let x = 0; x < wideCells; x++) {
		boardState[x] = []
		for (let y = 0; y < heightCells; y++) {
			boardState[x][y] = {free: true, img: backgroundImg}
		}
	}
	return boardState
}
