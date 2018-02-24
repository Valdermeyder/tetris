import {utils} from 'pixi.js/dist/pixi.min'

export const getBoardConfiguration = () => ({tileSize: 16, wideCells: 10, heightCells: 20})
export const getRenderType = () => utils.isWebGLSupported() ? 'WebGL' : 'canvas'