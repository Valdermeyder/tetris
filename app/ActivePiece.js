import {loader, Sprite} from 'pixi.js/dist/pixi.min'
import iHorizontalImg from '../assets/I_1-3.png'

export const generateActivePiece = () => new Sprite(loader.resources[iHorizontalImg].texture)
