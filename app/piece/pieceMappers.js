import iHorizontalImg from '../../assets/I_1-3.png'
import iVerticalImg from '../../assets/I_2-4.png'

const rotateMap = {
	[iHorizontalImg]: iVerticalImg,
	[iVerticalImg]: iHorizontalImg
}

export const getRotatedPieceImage = image => rotateMap[image]
