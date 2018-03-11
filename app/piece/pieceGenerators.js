import {i13, j1, o1234, s13, z13} from './pieceTypes'

const imgMap = {
	0: i13,
	1: o1234,
	2: s13,
	3: z13,
	4: j1
}

export const generateActivePiece = () => imgMap[Math.floor(Math.random() * Object.keys(imgMap).length)]
