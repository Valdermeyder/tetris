import {i13, j1, l1, o1234, s13, t1, z13} from './pieceTypes'

const imgMap = {
	0: i13,
	1: o1234,
	2: s13,
	3: z13,
	4: j1,
	5: l1,
	6: t1
}

export const generateActivePieceImg = () => imgMap[Math.floor(Math.random() * Object.keys(imgMap).length)]
