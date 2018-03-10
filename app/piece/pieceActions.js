import {CHANGE_ACTIVE_PIECE, GENERATE_ACTIVE_PIECE} from './pieceActionTypes'

export const generateActivePiece = () => ({type: GENERATE_ACTIVE_PIECE})
export const changeActivePiece = (img, cfg) => ({type: CHANGE_ACTIVE_PIECE, img, cfg})
