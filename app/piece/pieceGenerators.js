import {i13, o1234, s13} from './pieceTypes'

const imgMap = {
	0: i13,
	1: o1234,
	2: s13
}

export const generateActivePiece = () => imgMap[Math.floor(Math.random() * Object.keys(imgMap).length)]
