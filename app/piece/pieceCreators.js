import {loader, Sprite} from 'pixi.js/dist/pixi.min'

export const createPieceSprite = (img, cfg = {}) => Object.assign(new Sprite(loader.resources[img].texture), cfg)
