import iHorizontalImg from '../../assets/I_1-3.png'
import oImg from '../../assets/O_1-2-3-4.png'

const imgMap = {
	0: iHorizontalImg,
	1: oImg
}

export const generateActiveImg = () => imgMap[Math.floor(Math.random() * Object.keys(imgMap).length)]
