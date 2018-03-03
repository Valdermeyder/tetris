import {Text, TextStyle} from 'pixi.js/dist/pixi.min'

export const generateLoading = () => new Text('Loading...', new TextStyle({fill: 'white'}))
export const generateGameOver = () => new Text('Game Over', new TextStyle({fill: 'white'}))
